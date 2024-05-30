from sqlalchemy.sql import text
from random import choice, randint

from app.models import db, User, environment, SCHEMA, Vehicle


# Adds a demo user, you can add other users here if you want
def seed_vehicles():
    toyota = Vehicle(
        is_sold=False,
        is_for_sell=True,
        year=1998,
        price=500,
        make="Toyota",
        model="Tercel",
        # # trim='Base',
        mpg=10,
        transmission="Automatic",
        # # engine=,
        # fuel='Gas',
        drivetrain="FWD",
        color="Red",
        vin="".join(choice("0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ") for _ in range(17)),
        image="https://www.auto-data.net/images/f59/Acura-TL-III-UA6-7.jpg",
    )

    for _ in range(20):
        vehicle = Vehicle(
            is_sold=False,
            is_for_sell=True,
            year=randint(2010, 2025),
            price=randint(5000, 50000),
            make=choice(
                [
                    "Honda",
                    "Acura",
                    "Toyota",
                    "Ford",
                    "Chevrolet",
                    "Lexus",
                    "BMW",
                    "Audi",
                ]
            ),
            model=choice(
                ["Accord", "TL", "Camry", "F-150", "Silverado", "3 Series", "A4"]
            ),
            # trim=choice(["LX", "EX", "Base", "Sport", "Luxury", "Limited", "SE"]),
            mpg=randint(20, 40),
            transmission=choice(["Automatic", "Manual"]),
            # engine=choice(["2.0L", "3.5L", "5.0L", "1.8L", "2.5L", "4.0L"]),
            # fuel=choice(["Gas", "Diesel", "Hybrid", "Electric"]),
            drivetrain=choice(["FWD", "RWD", "AWD"]),
            color=choice(["Red", "Blue", "Black", "White", "Silver", "Gray"]),
            vin="".join(
                choice("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ") for _ in range(17)
            ),
            image="https://www.auto-data.net/images/f59/Acura-TL-III-UA6-7.jpg",
        )

        db.session.add(vehicle)
    db.session.add(toyota)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_vehicles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM vehicle"))

    db.session.commit()
