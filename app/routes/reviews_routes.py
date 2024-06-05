from flask import Blueprint, blueprints, request
from flask_login import login_required, current_user

from app.forms import ReviewForm
from app.models import db, Review

reviews_routes = Blueprint("reviews", __name__)


@reviews_routes.route("")
def all_vehicle_reviews():
    """
    Query for all current vehicle reviews
    """

    reviews = Review.query.filter_by()

    return [review.to_dict() for review in reviews]


@reviews_routes.route("/new", methods=["POST"])
@login_required
def new_review():
    """
    Add a new review to a vehicle
    """

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            vehicle_id=form.data["vehicle_id"],
            user_name=form.data["user_name"],
            vehicle_type=form.data["vehicle_type"],
            comment_text=form.data["comment_text"],
            user_state=form.data["user_state"],
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict()
    return form.errors, 400


@reviews_routes.route("/<int:review_id>/edit", methods=["POST"])
@login_required
def get_vehicle_review(review_id):
    """
    Update a review on a vehicle (User can have at most 1 review per vehicle)
    """

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        current_review = Review.query.get(review_id)
        setattr(current_review, "comment_text", form.data["comment_text"])

        db.session.commit()

        return current_review.to_dict()
    return form.errors, 400


@reviews_routes.route("/<int:review_id>/delete")
@login_required
def delete_review(review_id):
    """
    Delete the current users review
    """

    review_to_delete = Review.query.get(review_id)

    db.session.delete(review_to_delete)
    db.session.commit()

    return {"message": "Review deleted successfully"}
