# from sqlalchemy.orm import joinedload
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, Step, Ingredient, User, Rating
from app.forms import RecipeForm, IngredientForm, StepForm, RatingForm
from app.models.ingredient import Ingredient
from .auth_routes import validation_errors_to_error_messages
# import statistics

recipe_routes = Blueprint('recipes', __name__)

# Get all recipes
# Tested--working
@recipe_routes.route('/')
@recipe_routes.route('')
def all_recipes():
    recipes = Recipe.query.all()
    # recipes_dict = recipes.to_dict()
    # print(recipes)
    recipes_list = list()
    for recipe in recipes:
        recipe_dict = recipe.to_dict()
        user = User.query.get(recipe_dict['user_id']);
        recipe_dict['user'] = user.to_dict()
        recipes_list.append(recipe_dict)
        # print(recipe_dict)
    # print(recipes_list)
    return {"recipes": recipes_list}


# Get a single recipe by the recipe's ID
# Tested--working
@recipe_routes.route('/<int:recipe_id>/')
# @recipe_routes.route('/<int:recipe_id>')
def single_recipe(recipe_id):
    recipe = (db.session.query(Recipe).
                # options(joinedload(Recipe.ingredients)).
                # options(db.joinedload(Recipe.steps)).
                # options(db.joinedload(Recipe.user)).
                # order_by(Step.id)
                get(recipe_id))
    # print(recipe.to_dict())
    if recipe:
        recipe_dict = recipe.to_dict()
        user = User.query.get(recipe_dict['user_id'])
        user_dict = user.to_dict()
        ratings = Rating.query.filter(Rating.recipe_id == recipe_id).all()
        if len(ratings) > 0:
            sum = 0
            for rating in ratings:
                sum += rating.rating
            avg_rating = sum / len(ratings)
            recipe_dict['avg_rating'] = avg_rating
        # steps = [s.to_dict() for s in recipe.steps]
        # ingredients = [i.to_dict() for i in recipe.ingredients]
        # recipe_dict['steps'] = steps
        # recipe_dict['ingredients'] = ingredients
        recipe_dict['user'] = user_dict
        return recipe_dict

    else:
        return {'errors': ['Recipe not found']}, 404

# Get all steps for a recipe
@recipe_routes.route('/<int:recipe_id>/steps/')
# @recipe_routes.route('/<int:recipe_id>/steps')
def get_steps(recipe_id):
    steps = (db.session.query(Step).filter(Step.recipe_id == recipe_id).order_by(Step.id).all())
    return {"steps": [step.to_dict() for step in steps]}

# Get all ingredients for a recipe
@recipe_routes.route('/<int:recipe_id>/ingredients/')
# @recipe_routes.route('/<int:recipe_id>/ingredients')
def get_ingredients(recipe_id):
    ingredients = (db.session.query(Ingredient).filter(Ingredient.recipe_id == recipe_id).all())
    return {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}

# Create a new recipe
# Tested--working
@recipe_routes.route('/new/', methods=['POST'])
# @recipe_routes.route('/new', methods=['POST'])
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
        recipe_dict = recipe.to_dict()
        user = User.query.get(recipe.user_id)
        recipe_dict['user'] = user.to_dict()
        return recipe_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Add ingredients to a recipe
# Tested--working
@recipe_routes.route('/<int:recipe_id>/ingredients/new/', methods=['POST'])
# @recipe_routes.route('/<int:recipe_id>/ingredients/new', methods=['POST'])
@login_required
def add_ingredients(recipe_id):
    form=IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ingredient = Ingredient(
            quantity=form.data['quantity'],
            unit=form.data['unit'],
            name=form.data['name'],
            recipe_id=recipe_id
        )
        db.session.add(ingredient)
        db.session.commit()
        print(ingredient)
        return ingredient.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


# Add steps to a recipe
@recipe_routes.route('/<int:recipe_id>/steps/new/', methods=['POST'])
# @recipe_routes.route('/<int:recipe_id>/steps/new', methods=['POST'])
@login_required
def add_steps(recipe_id):
    form=StepForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        step = Step(
            description=form.data['description'],
            recipe_id=recipe_id
        )
        db.session.add(step)
        db.session.commit()
        return step.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


# Edit a recipe by its ID
@recipe_routes.route('/<int:recipe_id>/edit/', methods=['PUT'])
# @recipe_routes.route('/<int:recipe_id>/edit', methods=['PUT'])
@login_required
def edit_recipe(recipe_id):
    # Need to return the recipe along with the ingredients and steps
    recipe = db.session.query(Recipe).get(recipe_id)
    if recipe is not None:
        # print('before:    ', recipe.to_dict())
        recipe_dict = recipe.to_dict()
        user = User.query.get(recipe_dict['user_id'])
        user_dict = user.to_dict()
        if recipe_dict['user_id'] != current_user.id:
            return {'errors': ['You are not authorized to edit this recipe']}, 401
        form = RecipeForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        for k in form.data:
            if not form.data[k]:
                form[k].data = recipe_dict[k]
        if form.validate_on_submit():
            for k in form.data:
                if k !='csrf_token':
                    setattr(recipe, k, form.data[k])
            db.session.commit()
            recipe_dict['user'] = user_dict
            # print('after   ', recipe_dict)
            return recipe_dict
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}
    else:
        return {'errors': ['Recipe not found']}, 404


# Delete a recipe by its ID
@recipe_routes.route('/<int:recipe_id>/delete/', methods=['DELETE'])
# @recipe_routes.route('/<int:recipe_id>/delete', methods=['DELETE'])
@login_required
def delete_recipe(recipe_id):
    recipe = db.session.query(Recipe).get(recipe_id)
    if recipe is not None:
        recipe_dict = recipe.to_dict()
        if recipe_dict['user_id'] != current_user.id:
            return {'errors': ['You are not authorized to delete this recipe']}, 401
        else:
            db.session.delete(recipe)
            db.session.commit()
            return {'message': 'Recipe deleted successfully'}
    else:
        return {'errors': ['Recipe not found']}, 404


# Add a rating to a recipe
@recipe_routes.route('/<int:recipe_id>/ratings/new/', methods=['POST'])
@login_required
def add_rating(recipe_id):
    form = RatingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    existing_rating = db.session.query(Rating).filter(Rating.user_id == current_user.id, Rating.recipe_id == recipe_id).first()
    if existing_rating is not None:
        return {'errors': ['You have already rated this recipe']}, 401
    if form.validate_on_submit():
        rating = Rating(
            recipe_id=recipe_id,
            user_id=current_user.id,
            rating=form.data['rating']
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


# Get a recipe's rating for the current user
@recipe_routes.route('/<int:recipe_id>/ratings/', methods=['GET'])
@login_required
def get_rating(recipe_id):
    ratings = (db.session.query(Rating).
                filter(Rating.user_id == current_user.id).
                filter(Rating.recipe_id == recipe_id).
                all())
    print(ratings)
    for rating in ratings:
        rating_dict = rating.to_dict()
        if rating_dict['user_id'] == current_user.id and rating_dict['recipe_id'] == recipe_id:
            return rating_dict
    return {'errors': ['You have not rated this recipe']}, 404
    # rating_list = list()
    # for rating in ratings:
    #     rating_dict = rating.to_dict()
    #     if rating_dict['user_id'] == current_user.id and rating_dict['recipe_id'] == recipe_id:
    #         rating_list.append(rating.to_dict())
    # if len(rating_list) > 0:
    #     for rating in rating_list:
    #         return rating.to_dict()
    # else:
    #     return {'errors': ['Rating not found']}, 404


# Get a recipe's average rating
@recipe_routes.route('/<int:recipe_id>/ratings/average/', methods=['GET'])
def get_average_rating(recipe_id):
    ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
    if len(ratings) > 0:
        sum = 0
        for rating in ratings:
            sum += rating.rating
        average = sum / len(ratings)
        return {'averageRating': average}
    else:
        return {'errors': ['This recipe has no ratings']}, 404
