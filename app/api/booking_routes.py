from flask import Blueprint, request
from flask_login import login_required

from app.models import db, Booking
from app.forms import NewBookingForm
from .auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint("bookings", __name__)


# get all upcoming bookings for a user
@booking_routes.route("/<int:userId>")
@login_required
def user_bookings(userId):
    bookings = Booking.query.filter(Booking.user_id == userId).all()
    res = [booking.to_dict() for booking in bookings]
    return {"bookings": res}

@booking_routes.route("/<int:spotId>")
@login_required
def spot_bookings(spotId):
    bookings = Booking.query.filter(Booking.spot_id == spotId).all()
    res = [booking.to_dict() for booking in bookings]
    return {"bookings": res}


# Create a booking
@booking_routes.route("/new", methods=["POST"])
@login_required
def add_booking():
    form = NewBookingForm()
    print(form.data)
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        print(data)
        booking = Booking(
            user_id=data["user_id"],
            spot_id=data["spot_id"],
            check_in=data["check_in"],
            check_out=data["check_out"],
            nights=data["nights"]
        )

        db.session.add(booking)
        db.session.commit()

        return booking.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# delete a booking
@booking_routes.route("/<int:bookingId>", methods=["DELETE"])
@login_required
def delete_booking(bookingId):
    booking = Booking.query.filter(Booking.id == bookingId).first()
    print(booking)
    if booking:
        db.session.delete(booking)
        db.session.commit()
        return {"id": booking.id}
    return {"errors": booking}, 401
    