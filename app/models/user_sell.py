from datetime import datetime

from .db import db, environment, SCHEMA, add_prefix_for_prod


class UserSell(db.Model):
    __tablename__ = "user_sells"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    vehicle_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")), nullable=False
    )
    offer_price = db.Column(db.Integer)
    finalized = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    seller = db.relationship("User", back_populates="sell")
    vehicle = db.relationship("Vehicle", back_populates="sell")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "vehicleId": self.vehicle_id,
            "offerPrice": self.offer_price,
            "finalized": self.finalized,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
