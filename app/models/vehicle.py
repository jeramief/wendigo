from datetime import datetime

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_sold = db.Column(db.Boolean, nullable=False)
    is_for_sell = db.Column(db.Boolean, nullable=False)
    price = db.Column(db.Integer)
    year = db.Column(db.Integer)
    make = db.Column(db.String(20), nullable=False)
    model = db.Column(db.String(20), nullable=False)
    # trim = db.Column(db.String(20), nullable=False)
    mpg = db.Column(db.Integer, nullable=False)
    transmission = db.Column(db.String(20), nullable=False)
    # engine = db.Column(db.String(20), nullable=False)
    # fuel = db.Column(db.String(20), nullable=False)
    drivetrain = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    vin = db.Column(db.String(17), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    sell = db.relationship("UserSell", back_populates="vehicle")
    purchase = db.relationship("UserBuy", back_populates="vehicle")
    comment = db.relationship("Review", back_populates="vehicle")
    user = db.relationship("User", secondary="wishlist", back_populates="wishs")

    def to_dict(self):
        return {
            "id": self.id,
            "isSold": self.is_sold,
            "isForSell": self.is_for_sell,
            "year": self.year,
            "price": self.price,
            "make": self.make,
            "model": self.model,
            # "trim": self.trim,
            "mpg": self.mpg,
            "transission": self.transmission,
            # "engine": self.engine,
            # "fuel": self.fuel,
            "drivetrain": self.drivetrain,
            "color": self.color,
            "vin": self.vin,
            "image": self.image,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
