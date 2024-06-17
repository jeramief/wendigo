from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import and_, or_, not_

from app.models import db, Vehicle

vehicles_routes = Blueprint("vehicles", __name__)


@vehicles_routes.route("")
def all_vehicles_for_sell():
    """
    Query for all vehicles available for sell
    """

    vehicles_for_sell = Vehicle.query.filter_by(is_sold=False, is_for_sell=True).all()

    return [vehicle.to_dict() for vehicle in vehicles_for_sell]


@vehicles_routes.route("/<int:car_id>")
def get_vehicle(car_id):
    """
    Query for single vehicle details
    """

    vehicle = Vehicle.query.filter_by(id=car_id).first()

    return vehicle.to_dict()


@vehicles_routes.route("/search")
def search_for_vehicle():
    """
    Search query for all vehicles available for sell by search query
    """

    query = request.args.get("query")

    vehicles_for_sell_filtered = (
        Vehicle.query.filter_by(is_sold=False, is_for_sell=True)
        .filter(
            or_(Vehicle.make.ilike(f"%{query}%"), Vehicle.model.ilike(f"%{query}%"))
        )
        .all()
    )

    return [vehicle.to_dict() for vehicle in vehicles_for_sell_filtered]
