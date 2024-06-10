from sqlalchemy.sql import text
from random import choice, randint

from app.models import db, User, environment, SCHEMA, Vehicle

vehicle_urls = [
    "https://wendigo-python.s3.us-east-2.amazonaws.com/ford-escape-307669902.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-2664304602.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-1626298251.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-1657834906.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-2102309418.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-2737896522.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-2752580276.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-3034405954.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-3380561490.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-3779711998.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-3953879758.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-458161424.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-63105809.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-89400750.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-940161998.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-1007752304.jpg",
    "https://wendigo-python.s3.us-east-2.amazonaws.com/th-2102309418.jpg",
]


# Adds a demo user, you can add other users here if you want
def seed_vehicles():
    toyota = Vehicle(
        is_sold=False,
        is_for_sell=True,
        year=1990,
        price=500,
        make="Toyota",
        model="Tercel",
        mileage=214552,
        # # trim='Base',
        mpg=10,
        transmission="Automatic",
        # # engine=,
        # fuel='Gas',
        drivetrain="FWD",
        color="Red",
        vin="".join(choice("0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ") for _ in range(17)),
        image="https://wendigo-python.s3.us-east-2.amazonaws.com/tercel-wendigo.jpg",
    )

    for _ in range(16):
        vehicle = Vehicle(
            is_sold=False,
            is_for_sell=True,
            year=randint(2010, 2023),
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
                ["Accord", "TL", "Camry", "Escape", "Impala", "IS", "3 Series", "A4"]
            ),
            mileage=randint(10000, 150000),
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
            image=choice(vehicle_urls),
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
        db.session.execute(text("DELETE FROM vehicles"))

    db.session.commit()
