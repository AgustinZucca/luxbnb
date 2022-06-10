from crypt import methods
from app.forms.new_spot_form import CreateSpotForm
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:userId/<int:spotId/new', methods=['POST'])
@login_required
def newReview(userId, spotId):
    form = NewReviewForm()

    if form.validate_on_submit():
        newReview = Review(
            user_id = userId,
            spot_id = spotId,
            review = form.data['review'],
            rating = form.data['rating']
        )

        db.session.add(newReview)
        db.session.commit()
        return newReview
