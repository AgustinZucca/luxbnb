from crypt import methods
from app.forms.new_review_form import NewReviewForm, EditReviewForm
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/new', methods=['POST'])
@login_required
def newReview():
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        newReview = Review(
            user_id = request.json['user_id'],
            spot_id = request.json['spot_id'],
            review = form.data['review'],
            rating = form.data['rating']
        )

        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()

    return

@review_routes.route('/<int:reviewId>/edit', methods=['PUT'])
@login_required
def editReview(reviewId):
    review = Review.query.get(reviewId)
    form = EditReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.review = form.data['review']

        db.session.add(review)
        db.session.commit()
        return review.to_dict()

        
@review_routes.route('/<int:reviewId>/delete', methods=['DELETE'])
@login_required
def deleteReview(reviewId):
    review = Review.query.get(reviewId)

    db.session.delete(review)
    db.session.commit()

    return review.to_dict()
