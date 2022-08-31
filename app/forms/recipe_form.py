from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, StopValidation
# from app.models import Recipe

def validate_str(form, field):
    if field.data is None or field.data != str(field.data):
        raise StopValidation('Please enter a valid string.')

def validate_int(form, field):
    if field.data is None or field.data != int(field.data):
        raise StopValidation('Please enter a valid integer.')

def validate_float(form, field):
    if field.data is None or field.data != float(field.data):
        raise StopValidation('Please enter a valid float.')

class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=50)])
    description = TextAreaField('description', validators=[DataRequired(), Length(min=1, max=1000)])
    time = IntegerField('time', validators=[DataRequired(), NumberRange(min=1, max=10000)])
    yield_servings = IntegerField('yield_servings', validators=[DataRequired(), NumberRange(min=1, max=10000)])
    image_url = StringField('image_url', validators=[Length(min=0, max=255)])
