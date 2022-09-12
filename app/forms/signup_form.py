from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('* This email address is already exists. Please use another.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('* This username is already exists. Please use another.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='* Please enter a username'), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(message='* Please enter your first name')])
    last_name = StringField('Last Name', validators=[DataRequired(message='* Please enter your last name')])
    email = StringField('email', validators=[DataRequired(message='* Please enter your email'), Email(message='* Please enter a valid email address'), user_exists])
    password = StringField('password', validators=[DataRequired(message='* Please create a password')])
