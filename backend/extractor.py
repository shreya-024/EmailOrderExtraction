from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
import base64
from google import genai
import json
from database import save_order


def extract_order(html_or_text):
    # Converts both text/plain and text/html safely
    soup = BeautifulSoup(html_or_text, "html.parser")
    txt = soup.get_text(separator=" ", strip=True)
    return txt

def get_email_body(payload):
    # 1. DIRECT BODY
    if "data" in payload.get("body", {}):
        try:
            decoded = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")
            return decoded
        except:
            pass

    # 2. PARTS
    if "parts" in payload:
        for part in payload["parts"]:
            text = get_email_body(part)
            if text:
                return text

    return ""

def parse_order(text):
    prompt = f"""
    Extract the following fields from this email text:
    - item ordered
    - quantity
    - customer phone number
    - customer address
    - email ID mentioned inside the message (if any)
    - delivery instructions (if any)

    Return output strictly as JSON with keys:
    item, quantity, phone, address, email, instructions

    Email text:
    {text}
    """

    client = genai.Client(api_key="AIzaSyCBwVZs5jVNDDPVwq9YS9RhtPMEuJqzbvI")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    raw = response.candidates[0].content.parts[0].text.strip()

    # FIX: Gemini sometimes wraps JSON in ```json ... ```
    if raw.startswith("```"):
        raw = raw.strip("`")
        raw = raw.replace("json", "")

    try:
        return json.loads(raw)
    except:
        return {
            "item": None,
            "quantity": None,
            "phone": None,
            "address": None,
            "email": None,
            "instructions": None
        }


def fetch_emails():
    creds = Credentials.from_authorized_user_file("token.json")
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(
        userId="me",
        q="subject:order"
    ).execute()

    messages = results.get("messages", [])
    data = []

    for msg in messages:
        m = service.users().messages().get(
            userId="me", id=msg["id"], format="full"
        ).execute()
        email_id = msg["id"]
        headers = m.get("payload", {}).get("headers", [])
        subject = ""

        for h in headers:
            if h["name"].lower() == "subject":
                subject = h["value"]
                break
        
        payload = m.get("payload", {})
        raw_body = get_email_body(payload)
        text = extract_order(raw_body)

        parsed = parse_order(text)
        save_order(msg["id"], subject, parsed)
        
        data.append({
            "id": msg["id"],
            "subject": subject,
            "body": text,
            "parsed": parsed
        })

    return data

