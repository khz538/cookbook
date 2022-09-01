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
        ingredient_dict = ingredient.to_dict()
        if ingredient_dict['recipe']['user_id'] != current_user.id:
            return {'errors': ['You are not authorized to edit this ingredient']}, 401
        else:
            return ingredient_dict
