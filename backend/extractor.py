from bs4 import BeautifulSoup
import re

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
