from flask import Blueprint
from app.models import db, Ingredient, Recipe

search_routes = Blueprint('search', __name__)

# Search recipe titles and ingredients
@search_routes.route('/<search_term>')
def search(search_term):
    recipes = db.session.query(Recipe).filter(Recipe.title.ilike(f'%{search_term}%')).all()
    recipe_ids = []
    for recipe in recipes:
        recipe_ids.append(recipe.id)
    ingredients = db.session.query(Ingredient).filter(Ingredient.name.ilike(f'%{search_term}%')).all()
    ingredient_ids = []
    for ingredient in ingredients:
        ingredient_ids.append(ingredient.recipe_id)
    recipe_ids = list(set(recipe_ids + ingredient_ids))
    recipes = db.session.query(Recipe).filter(Recipe.id.in_(recipe_ids)).all()
    return {recipe.id: recipe.to_dict() for recipe in recipes}
