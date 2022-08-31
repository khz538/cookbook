from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, User, Rating
from app.forms import RecipeForm, RatingForm
from .auth_routes import validation_errors_to_error_messages
import statistics

recipe_routes = Blueprint('recipes', __name__)

# Get all recipes
@recipe_routes.route('/')
@recipe_routes.route('')
def all_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}


# Get a single recipe by the recipe's ID
@recipe_routes.route('/<int:recipe_id>')
@recipe_routes.route('/<int:recipe_id>/')
def single_recipe(recipe_id):
    recipe = db.session.query(Recipe)\
        .options(db.joinedLoad(Recipe.ingredients))\
        .options(db.joinedLoad(Recipe.steps))\
        .get(recipe_id)
    if recipe:
        return recipe.to_dict()
    else:
        return {'errors': ['Recipe not found']}, 404


# Create a new recipe
@recipe_routes.route('/new', methods=['POST'])
@recipe_routes.route('/new/', methods=['POST'])
@login_required
def create_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe(
            title=form.data['title'],
            description=form.data['description'],
            time=form.data['time'],
            user_id=current_user.id,
            yield_servings=form.data['yield_servings'],
            image_url=form.data['image_url']
        )
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit a recipe by its ID
@recipe_routes.route('/<int:recipe_id>/edit/', methods=['PUT'])
@recipe_routes.route('/<int:recipe_id>/edit', methods=['PUT'])
@login_required
def edit_recipe(recipe_id):
    # Need to return the recipe along with the ingredients and steps
    recipe = db.session.query(Recipe)\
        .options(db.joinedLoad(Recipe.ingredients))\
        .options(db.joinedLoad(Recipe.steps))\
        .get(recipe_id)
    print(recipe.to_dict())
    # if recipe is not None:
    #     recipe_dict = recipe.to_dict()
    #     if recipe_dict['user_id'] != current_user.id:
    #         return {'errors': ['You are not authorized to edit this recipe']}, 401
    #     else:
    #         form = RecipeForm()
    #         form['csrf_token'].data = request.cookies['csrf_token']
    #         if form.validate_on_submit():
    #             for k in form.data:
    #                 if k != 'csrf_token':
    #                     setattr(recipe, k, form.data[k])
    #             db.session.commit()
    #             return recipe.to_dict()
    #         else:
    #             return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    # else:
    #     return {'errors': ['Recipe not found']}, 404
