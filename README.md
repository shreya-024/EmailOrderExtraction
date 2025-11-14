## Overview

Backend fetches Gmail messages through OAuth, extracts mail body, parses order-related info (item, quantity), and returns only mails that appear to contain orders.
Frontend requests and displays the filtered results.

---

## Folder Structure

```
project/
│
├── backend/
│   ├── main.py
│   ├── token.json
│   ├── credentials.json
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   └── App.jsx
    ├── index.html
    └── package.json
```

---

## Backend Setup (FastAPI + Gmail API)

### 1. Install dependencies

```
pip install fastapi uvicorn google-api-python-client google-auth-oauthlib google-auth-httplib2 beautifulsoup4 python-multipart
```

### 2. Place Google OAuth files

* `credentials.json` from Google Cloud Console
* After first OAuth login, `token.json` is generated automatically

### 3. Start backend

```
uvicorn main:app --reload --port 5000
```

Backend listens on:

```
http://localhost:5000
```

---

## Gmail API Behavior

Backend fetches emails where subject/body contains:

```
order, ordered, purchase, buy
```

Then extracts:

* raw message body
* item name
* quantity

Only emails matching the pattern are returned.

---

## Frontend Setup (React + Vite)

### 1. Install dependencies

```
npm install
```

### 2. Start frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## OAuth Configuration (Google Cloud Console)

### Authorized JavaScript Origin

```
http://localhost:5173
```

### Authorized Redirect URI

```
http://localhost:5173
```

---

## API Endpoint

### GET `/fetch-emails`

Returns only order-related emails:

Sample response:

```json
[
  {
    "id": "18as9d8a9sd",
    "subject": "Order confirmation",
    "body": "hello. i want to order an icecream.",
    "item": "an icecream",
    "quantity": null
  }
]
```

---

## Frontend Logic

`App.jsx` fetches emails from backend:

```jsx
useEffect(() => {
  fetch("http://localhost:5000/fetch-emails")
    .then(r => r.json())
    .then(d => setEmails(d));
}, []);
```

Renders:

* subject
* body
* item name extracted
* quantity if present

---

## Purpose of This Setup

* Automatically detect customer order emails
* Display order item and quantity extracted from email text
* Works with Gmail API securely
* React+FastAPI stack

---
