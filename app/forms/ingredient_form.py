from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, StopValidation
from app.models import Ingredient


def validate_str(form, field):
    if field.data is None or field.data != str(field.data):
        raise StopValidation('Please enter a valid string.')

def validate_int(form, field):
    if field.data is None or field.data != int(field.data):
        raise StopValidation('Please enter a valid integer.')

def validate_float(form, field):
    if field.data is None or field.data != float(field.data):
        raise StopValidation('Please enter a valid float.')

class IngredientForm(FlaskForm):
    quantity = FloatField('quantity', validators=[DataRequired()])
    unit = StringField('unit')
    name = StringField('name', validators=[DataRequired()])
