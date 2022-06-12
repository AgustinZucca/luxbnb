from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange



class CreateSpotForm(FlaskForm):
    image = StringField('Image', validators=[DataRequired(message='Cannot share spot without image')])
    address = StringField('Address', validators=[DataRequired(message='Spot needs an address')])
    city = StringField('City', validators=[DataRequired(message='Spot needs a city')])
    state = StringField('State')
    country = StringField('Country', validators=[DataRequired(message='Spot needs an country')])
    name = StringField('Name', validators=[DataRequired(message='Spot needs a name')])
    description = TextAreaField('Description', validators=[DataRequired(message='Spot needs a description')])
    beds = IntegerField('Beds', validators=[DataRequired(message='Specify how many beds in your spot'), NumberRange(min=1, max=20, message='Spot can have between 1 and 20 beds')])
    baths = IntegerField('baths', validators=[DataRequired(message='Specify how many baths in your spot'), NumberRange(min=1, max=20, message='Spot can have between 1 and 20 baths')])
    price = IntegerField('Price', validators=[DataRequired(message='Specify price per night of your spot'), NumberRange(min=1, max=100000, message='Spot price per night must be between 1 and 100,000')])


