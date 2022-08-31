from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, User, Rating
from app.forms import RecipeForm, RatingForm
from .auth_routes import validation_errors_to_error_messages
import statistics

recipe_routes = Blueprint('recipes', __name__)
