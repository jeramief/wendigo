from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import db, Vehicle

vehicles_routes = Blueprint("vehicles", __name__)


@vehicles_routes.route("")
def all_vehicles_for_sell():
    """
    Query for all vehicles available for sell
    """
    vehicles_for_sell = Vehicle.query.filter_by(is_sold=False, is_for_sell=True)

    return [vehicle.to_dict() for vehicle in vehicles_for_sell]
