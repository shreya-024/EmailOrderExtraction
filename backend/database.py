from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()

def get_conn():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def save_order(email_id, subject, parsed):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO orders (
            email_id,
            subject,
            item,
            quantity,
            phone,
            address,
            email,
            instructions
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (email_id) DO NOTHING;
        """,
        (
            email_id,
            subject,
            parsed["item"],
            parsed["quantity"],
            parsed["phone"],
            parsed["address"],
            parsed["email"],
            parsed["instructions"]
        )
    )


    conn.commit()
    cur.close()
    conn.close()
