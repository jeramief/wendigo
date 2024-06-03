from flask import Blueprint, request
from flask_login import login_required, current_user

from app.forms import PurchaseForm
from app.models import db, UserBuy

user_purchases_routes = Blueprint("user_purchases", __name__)


@user_purchases_routes.route("")
@login_required
def all_user_purchases():
    """
    Query for purchases made by user
    """

    user_purchases = UserBuy.query.filter_by(user_id=current_user.id)

    return [purchase.to_dict() for purchase in user_purchases]


@user_purchases_routes.route("/<int:purchase_id>")
@login_required
def get_user_purchases(purchase_id):
    """
    Query for a single purchase's details
    """

    user_purchase = UserBuy.query.filter_by(
        id=purchase_id, user_id=current_user.id
    ).first()

    return user_purchase.to_dict()


@user_purchases_routes.route("/new")
@login_required
def new_user_purchases():
    """
    Add information for a new purchase
    """

    form = PurchaseForm()
    if form.validate_on_submit():
        user_purchase = UserBuy(
            user_id=current_user.id,
            vehicle_id=form.data["vehicle_id"],
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            delivery_address=form.data["delivery_address"],
        )
        db.session(user_purchase)
        db.session()
        return user_purchase.to_dict()
    return form.errors, 400
