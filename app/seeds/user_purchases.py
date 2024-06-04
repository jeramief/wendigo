from sqlalchemy.sql import text
from random import choice, randint

from app.models import db, environment, SCHEMA, UserBuy


# Adds a demo user, you can add other users here if you want
def seed_user_purchases():
    marnie_purchase = UserBuy(
        user_id=2,
        vehicle_id=2,
        first_name="Marnie",
        last_name="User",
        delivery_address="123 This Street",
        finalized=False,
    )
    marnie_purchase_2 = UserBuy(
        user_id=2,
        vehicle_id=3,
        first_name="Marnie",
        last_name="User",
        delivery_address="123 This Street",
        finalized=True,
    )

    db.session.add(marnie_purchase)
    db.session.add(marnie_purchase_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_purchases():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_buys"))

    db.session.commit()
