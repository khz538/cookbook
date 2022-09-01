from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, Ingredient
from app.forms import RecipeForm, IngredientForm
from .auth_routes import validation_errors_to_error_messages

ingredient_routes = Blueprint('ingredients', __name__)

# Edit an ingredient
@ingredient_routes.route('/<int:ingredient_id>', methods=['PUT'])
@ingredient_routes.route('<int:ingredient_id>/', methods=['PUT'])
@login_required
def edit_ingredient(ingredient_id):
    ingredient = db.session.query(Ingredient).get(ingredient_id)
    if ingredient:
        pass
