from database import get_conn

conn = get_conn()
cur = conn.cursor()

cur.execute("SELECT * FROM orders;")   # replace with your table name
rows = cur.fetchall()

print(rows)

cur.close()
conn.close()
