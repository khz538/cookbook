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
    # print('ingredient', ingredient)
    if ingredient is None:
        return {'errors': ['Ingredient not found']}, 404
    elif ingredient.recipe.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this ingredient']}, 401
    elif ingredient:
        form = IngredientForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            ingredient.name = form.data['name']
            ingredient.quantity = form.data['quantity']
            ingredient.unit = form.data['unit']
            db.session.commit()
            return ingredient.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete an ingredient
@ingredient_routes.route('/<int:ingredient_id>', methods=['DELETE'])
@ingredient_routes.route('/<int:ingredient_id>/', methods=['DELETE'])
@login_required
def delete_ingredient(ingredient_id):
    ingredient = db.session.query(Ingredient).get(ingredient_id)
    if ingredient is None:
        return {'errors': ['Ingredient not found']}, 404
    elif ingredient.recipe.user_id != current_user.id:
        return {'errors': ['You are not authorized to delete this ingredient']}, 401
    else:
        db.session.delete(ingredient)
        db.session.commit()
        return {'message': 'Ingredient deleted'}
