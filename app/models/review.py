from datetime import datetime

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    vehicle_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")), nullable=False
    )
    vehicle = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(100), nullable=False)
    verified_owner = db.Column(db.Boolean, nullable=False)
    user_state = db.Column(db.String(2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    commenter = db.relationship("User", back_populates="comment")
    vehicle = db.relationship("Vehicle", back_populates="comment")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "vehicleId": self.vehicle_id,
            "vehicle": self.vehicle,
            "comment": self.comment,
            "verifiedOwner": self.verified_owner,
            "userState": self.user_state,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
