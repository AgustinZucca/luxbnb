from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class NewReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(message='Cannot leave review empty'), Length(max=250, message='Too long')])
    rating = IntegerField('Rating', validators=[DataRequired()])

class EditReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(message='Cannot leave review empty'), Length(max=250, message='Too long')])
    rating = IntegerField('Rating', validators=[DataRequired()])