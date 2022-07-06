import datetime
from .db import db

class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), default='')
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    baths = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user = db.relationship('User', back_populates='spots')
    reviews = db.relationship('Review', back_populates='spot', cascade='all, delete')
    images = db.relationship('Image', back_populates='spot', cascade='all, delete')
    bookings = db.relationship('Booking', back_populates='spot', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'reviews': [review.to_dict() for review in self.reviews],
            'images': [image.to_dict() for image in self.images],
            'bookings': [booking.booking_info() for booking in self.bookings],
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'name': self.name,
            'description': self.description,
            'beds': self.beds,
            'baths': self.baths,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }