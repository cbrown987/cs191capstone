class APINotImplementedException(Exception):
    """Exception raised when a method is not implemented for a specified API."""
    def __init__(self, api=""):
        self.message = f"This method is not implemented for the API {api}"
        super().__init__(self.message)