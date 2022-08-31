from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange
# from app.models import Rating

def validate_int(form, field):
    if field.data is None or field.data != int(field.data):
        raise ValidationError('Please enter a valid integer.')

class RatingForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
