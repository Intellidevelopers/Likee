import re

def is_invalid_message(message):
    """
    Check if the message contains phone numbers, emails, or contacts.
    Returns True if invalid, otherwise False.
    """
    phone_pattern = r'(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d-.\s]{5,13}\d'
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    contact_keywords = r'\b(contact|phone|email|mobile|whatsapp)\b'

    if re.search(phone_pattern, message):
        return True
    if re.search(email_pattern, message):
        return True
    if re.search(contact_keywords, message, re.IGNORECASE):
        return True
    return False

# Example messages
messages = [
    "Hello, how are you?",
    "My phone number is +123-456-7890",
    "Reach me at email@example.com",
    "Contact me via WhatsApp 08012345678",
    "This is a normal chat message.",
]

# Filter messages
clean_messages = [msg for msg in messages if not is_invalid_message(msg)]

print("Filtered Messages:")
for msg in clean_messages:
    print(msg)
