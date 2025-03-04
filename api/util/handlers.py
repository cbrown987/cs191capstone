from api.endpoints import TheMealDB, TheCocktailDB, NinjasCocktailAPI, NinjasRecipeAPI


def handle_id_calls(call_id: str):
    """
    Handles API calls based on the provided string identifier and retrieves information
    from the appropriate database by invoking the respective class' method.

    IDs are delivered to the API in the form <DB>+<ID>
    """
    api_ids = {
        "M": TheMealDB,
        "C": TheCocktailDB,
        "N": NinjasCocktailAPI,
        "R": NinjasRecipeAPI
    }
    id_lst = call_id.split('+')
    db_class = api_ids[id_lst[0]]
    return db_class().search_by_id(id_lst[1])

