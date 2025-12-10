from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from extractor import fetch_emails

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fetch-emails")
def route_fetch_emails():
    return fetch_emails()

# NEW: Hardcoded Completed Orders
# -------------------------------
@app.get("/orders/completed")
def get_completed_orders():
    return {
        "status": "success",
        "completed_orders": [
            {
                "order_id": 91,
                "email_id": "abc@gmail.com",
                "item": "Pen pack",
                "quantity": "5",
                "address": "Library",
                "phone": "1112223334",
                "status": "completed"
            },
            {
                "order_id": 92,
                "email_id": "xyz@gmail.com",
                "item": "Notebook",
                "quantity": "3",
                "address": "Admin Office",
                "phone": "4445556667",
                "status": "completed"
            }
        ]
    }


# -------------------------------
# NEW: Hardcoded Stats Page
# -------------------------------
@app.get("/stats")
def get_stats():
    return {
        "status": "success",
        "stats": {
            "total_emails_checked": 45,
            "total_orders_extracted": 30,
            "pending_orders": 12,
            "completed_orders": 18,
            "last_sync": "2025-02-15 17:32:00"
        }
    }