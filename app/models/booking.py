from .db import db
# from sqlalchemy import UniqueConstraint

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey("spots.id"), nullable=False) 
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)

    user = db.relationship("User", back_populates="bookings")
    spot = db.relationship("Spot", back_populates="bookings")

    # __table_args__ = (UniqueConstraint("spot_id", "check_in", "check_out", name="booking_date"), )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "spot_id": self.spot_id,
            "check_in": self.check_in,
            "check_out": self.check_out
        }

    def booking_info(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "spot_id": self.spot_id,
            "spot": self.spot.booking_info(),
            "check_in": self.check_in,
            "check_out": self.check_out,
        }