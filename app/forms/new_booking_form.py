from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField
from wtforms.validators import DataRequired


class NewBookingForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    spot_id = IntegerField("spot_id", validators=[DataRequired()])
    check_in = DateField("check_in", validators=[DataRequired()])
    check_out = DateField("check_out", validators=[DataRequired()])
    nights = IntegerField("nights", validators=[DataRequired()])