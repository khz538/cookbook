from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, StopValidation, Length
from app.models import Step

def validate_str(form, field):
    if field.data is None or field.data != str(field.data):
        raise StopValidation('Please enter a valid string.')

def validate_int(form, field):
    if field.data is None or field.data != int(field.data):
        raise StopValidation('Please enter a valid integer.')

class StepForm(FlaskForm):
    description = TextAreaField('description', validators=[DataRequired()])
