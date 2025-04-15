from api.endpoints.base import BaseDB
from better_profanity import profanity

class ContentFilter(BaseDB):
    def __init__(self, db_instance, filter_rules=None):
        profanity.load_censor_words()
        if callable(db_instance):
            self.db_instance = db_instance()
        else:
            self.db_instance = db_instance
        super().__init__(self.db_instance.endpoint)
        self.filter_rules = filter_rules or {}

    def search_by_name(self, name):
        results = self.db_instance.search_by_name(name)
        return self._apply_filters(results)

    def get_one_random(self):
        for _ in range(10):
            result = self.db_instance.get_one_random()
            return self._censor_result(result)
        return None

    def get_n_random(self, n):
        results = []
        raw_results = self.db_instance.get_n_random(n * 2)
        for result in raw_results:
            results.append(self._censor_result(result))
            if len(results) == n:
                break
        return results

    def _apply_filters(self, results):
        if isinstance(results, dict) and 'meals' in results:
            if results['meals'] is None:
                return results
            filtered_meals = []
            for meal in results['meals']:
                filtered_meals.append(self._censor_result(meal))
            return {'meals': filtered_meals}

        elif isinstance(results, dict) and 'drinks' in results:
            if results['drinks'] is None:
                return results
            filtered_drinks = []
            for drink in results['drinks']:
                filtered_drinks.append(self._censor_result(drink))
            return {'drinks': filtered_drinks}

        elif isinstance(results, list):
            filtered_results = []
            for item in results:
                filtered_results.append(self._censor_result(item))
            return filtered_results

        else:
            return self._censor_result(results)

    def _censor_result(self, result):
        if result is None:
            return None

        if isinstance(result, dict):
            censored_result = result.copy()
            for key, value in censored_result.items():
                if isinstance(value, str) and value.strip():
                    censored_result[key] = profanity.censor(value)
            return censored_result

        elif isinstance(result, str):
            return profanity.censor(result)

        return result

    def _passes_filter(self, result) -> bool:
        return profanity.contains_profanity(result)
