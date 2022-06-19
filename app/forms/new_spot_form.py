from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField
from wtforms.validators import DataRequired, NumberRange, Length



class CreateSpotForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired(message='Spot needs an address'), Length(max=255, message='Address cannot be longer than 255 characters.')])
    city = StringField('City', validators=[DataRequired(message='Spot needs a city'), Length(max=20, message='City cannot be longer than 20 characters.')])
    state = SelectField('State', choices=['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'])
    name = StringField('Name', validators=[DataRequired(message='Spot needs a name'), Length(max=20, message='Name cannot be longer than 20 characters.')])
    description = TextAreaField('Description', validators=[DataRequired(message='Spot needs a description'), Length(max=500, message='Description cannot have more than 500 characters')])
    beds = IntegerField('Beds', validators=[DataRequired(message='Specify how many beds in your spot'), NumberRange(min=1, max=20, message='Spot can have between 1 and 20 beds')])
    baths = IntegerField('baths', validators=[DataRequired(message='Specify how many baths in your spot'), NumberRange(min=1, max=20, message='Spot can have between 1 and 20 baths')])
    price = IntegerField('Price', validators=[DataRequired(message='Specify price per night of your spot'), NumberRange(min=1, max=100000, message='Spot price per night must be between 1 and 100,000')])


