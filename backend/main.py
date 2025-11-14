from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
import base64
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_order(html):
    soup = BeautifulSoup(html, "html.parser")
    return soup.get_text()

def parse_order(text):
    item = None
    qty = None

    item_match = re.search(r"(order|ordered)\s+(.*)", text, re.IGNORECASE)
    if item_match:
        item = item_match.group(2).strip()

    qty_match = re.search(r"(\d+)\s*(units|pieces|pcs|qty|quantity)", text, re.IGNORECASE)
    if qty_match:
        qty = qty_match.group(1)

    return {"item": item, "quantity": qty}


@app.get("/fetch-emails")
def fetch_emails():
    creds = Credentials.from_authorized_user_file("token.json")
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(
        userId="me",
        q="order OR ordered OR purchase OR buy"
    ).execute()

    messages = results.get("messages", [])
    data = []

    for msg in messages:
        m = service.users().messages().get(
            userId="me", id=msg["id"], format="full"
        ).execute()

        payload = m.get("payload", {})
        parts = payload.get("parts", [])

        body = ""
        for p in parts:
            if p.get("mimeType") == "text/html":
                body = base64.urlsafe_b64decode(
                    p["body"]["data"]
                ).decode("utf-8")
                break

        text = extract_order(body)
        parsed = parse_order(text)

        # only include mails that contain clear order data
        if parsed["item"] or parsed["quantity"]:
            data.append({
                "id": msg["id"],
                "subject": m["snippet"],
                "body": text,
                "item": parsed["item"],
                "quantity": parsed["quantity"]
            })

    return data
