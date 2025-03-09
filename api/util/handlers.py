from api.endpoints import TheMealDB, TheCocktailDB, NinjasCocktailAPI, NinjasRecipeAPI

_API_IDS = {
        "M": TheMealDB,
        "C": TheCocktailDB,
        # "N": NinjasCocktailAPI,
        # "R": NinjasRecipeAPI
    }

def handle_api_call(call_id: str, search_method: str = 'search_by_id'):
    """
    Generic handler for API calls based on database identifier.

    Args:
        call_id (str): API identifier in format '<DB>+<ID>'
        search_method (str, optional): Method to call on database class. Defaults to 'search_by_id'.
    """
    try:
        db_type, item_id = call_id.split('+')
        db_class = _API_IDS[db_type]
        return getattr(db_class(), search_method)(item_id)
    except (ValueError, KeyError) as e:
        raise ValueError(f"Invalid API call format: {call_id}") from e


def handle_id_calls(call_id: str):
    return handle_api_call(call_id, search_method='search_by_id')

def handle_ingredient_calls(call_id: str):
    return handle_api_call(call_id, search_method='get_ingredient_by_id')

def handle_name_search_calls(query: str):
    response = []
    for db_type in _API_IDS:
        call_id = f"{db_type}+{query}"
        response.append(handle_api_call(call_id, search_method='search_by_name'))
    return response