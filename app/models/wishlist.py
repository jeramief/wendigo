from datetime import datetime

from .db import db, environment, SCHEMA, add_prefix_for_prod

WISHLIST_SCHEMA = SCHEMA if environment == "production" else None

wishlist = db.Table(
    "wishlist",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True,
    ),
    db.Column(
        "vehicle_id",
        db.Integer,
        db.ForeignKey("vehicles.id"),
        primary_key=True,
    ),
    schema=WISHLIST_SCHEMA,
)
