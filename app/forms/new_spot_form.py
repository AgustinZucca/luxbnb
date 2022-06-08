from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired



class CreateSpotForm(FlaskForm):
    image = StringField('Image', validators=[DataRequired(message='Cannot share spot without image')])
    address = StringField('Address', validators=[DataRequired(message='Spot needs an address')])
    city = StringField('City', validators=[DataRequired(message='Spot needs a city')])
    state = StringField('State')
    country = StringField('Country', validators=[DataRequired(message='Spot needs an country')])
    name = StringField('Name', validators=[DataRequired(message='Spot needs a name')])
    description = TextAreaField('Description', validators=[DataRequired(message='Spot needs a description')])
    beds = IntegerField('Beds', validators=[DataRequired(message='Specify how many beds in your spot')])
    baths = IntegerField('baths', validators=[DataRequired(message='Specify how many baths in your spot')])
    price = IntegerField('Price', validators=[DataRequired(message='Specify price per night of your spot')])


