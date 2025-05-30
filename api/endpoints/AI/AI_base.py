import openai
from api.config import Config
from api.endpoints.AI.system_prompts import DESCRIPTION_SYSTEM_PROMPT, SUBSTITUTION_SYSTEM_PROMPT, \
    MENU_BUILDER_SYSTEM_PROMPT, CHAT_SYSTEM_PROMPT, CHAT_CONTEXT_SYSTEM_PROMPT, CHAT_PREVIOUS_MESSAGES_PROMPT, \
    CHAT_ALL_CONTEXT_PROMPT
from api.util.fastapi_types import ChatContext

def _determine_chat_system_prompt(context: ChatContext = None):
    if context is None:
        return CHAT_SYSTEM_PROMPT

    has_context = bool(context.context)
    has_previous_messages = bool(context.previous_messages)

    if has_context and has_previous_messages:
        return CHAT_ALL_CONTEXT_PROMPT.format(
            CONTEXT=context.context,
            PREVIOUS_MESSAGES=context.previous_messages
        )
    elif has_context:
        return CHAT_CONTEXT_SYSTEM_PROMPT.format(CONTEXT=context.context)
    elif has_previous_messages:
        return CHAT_PREVIOUS_MESSAGES_PROMPT.format(PREVIOUS_MESSAGES=context.previous_messages)
    else:
        return CHAT_SYSTEM_PROMPT

class AIBase:
    def __init__(self):
        api_key = Config.get_secret('API_HYPERBOLIC_KEY')
        if not api_key:
            raise EnvironmentError("The API key for hyperbolic is missing. Set it in the environment.")
        self._client = openai.OpenAI(
            api_key=api_key,
            base_url="https://api.hyperbolic.xyz/v1",
        )

    def _query(self, system_query, user_query):
        chat_completion = self._client.chat.completions.create(
            model="meta-llama/Meta-Llama-3.1-70B-Instruct",
            messages=[
                {"role": "system", "content": system_query},
                {"role": "user", "content": user_query},
            ],
            temperature=0.7,
            max_tokens=1024,
        )
        response = chat_completion.choices[0].message.content
        return response

    def query_for_description(self, query):
        return self._query(
            system_query=DESCRIPTION_SYSTEM_PROMPT,
            user_query=query,
        )

    def query_for_substitutions(self, query):
        return self._query(
            system_query=SUBSTITUTION_SYSTEM_PROMPT,
            user_query=query,
        )

    def build_menu(self, meals, cocktails, preferences=None):
        base_query = f"MEAL LIST: {str(meals)} DRINK LIST: {str(cocktails)}"
        if preferences:
            base_query += f" USER PREFERENCES: {preferences}"

        return self._query(
            system_query=MENU_BUILDER_SYSTEM_PROMPT,
            user_query=base_query
        )

    def chat(self, user_message, context: ChatContext=None):
        SYSTEM_PROMPT = _determine_chat_system_prompt(context)
        return self._query(
            system_query=SYSTEM_PROMPT,
            user_query=user_message,
        )





