from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Ingredient, ShoppingList, ingredient
from .auth_routes import validation_errors_to_error_messages

shopping_list_routes = Blueprint('shopping_list', __name__)

# Add all recipe ingredients to shopping list
@shopping_list_routes.route('/add/', methods=['POST'])
@login_required
def add_to_shopping_list():
    recipe_id = request.json['recipe_id']
    ingredients = db.session.query(Ingredient).filter(Ingredient.recipe_id == recipe_id).all()
    ingredient_ids = []
    for ingredient in ingredients:
        ingredient_ids.append(ingredient.id)
    if ingredients is None:
        return {'errors': ['Ingredients not found']}, 404
    else:
        res = {}
        shopping_list = db.session.query(ShoppingList).filter(ShoppingList.user_id == current_user.id).all()
        # print('shopping_list:', shopping_list)
        if len(shopping_list) == 0:
            for ingredient in ingredients:
                shopping_list_item = ShoppingList(
                    user_id = current_user.id,
                    ingredient_id = ingredient.id
                )
                db.session.add(shopping_list_item)
                db.session.commit()
                # res[ingredient.id] = shopping_list_item.to_dict()
            shopping_list_query = db.session.query(ShoppingList).filter(ShoppingList.user_id == current_user.id).all()
        elif len(shopping_list) > 0:
            for ingredient in ingredients:
                shopping_list_query = db.session.query(ShoppingList).filter(ShoppingList.user_id == current_user.id).all()
                shopping_list_dict = {}
                shopping_list_set = set()
                for i,item in enumerate(shopping_list_query):
                    shopping_list_dict[item.id] = item.to_dict()
                    shopping_list_set.add(list(shopping_list_dict.values())[i]['ingredient_id'])
                if ingredient.id not in shopping_list_set:
                    shopping_list_item = ShoppingList(
                        user_id = current_user.id,
                        ingredient_id = ingredient.id
                    )
                    db.session.add(shopping_list_item)
                    db.session.commit()
        return {res.to_dict()['id']: res.to_dict() for res in shopping_list_query}


# Get all shopping list items
@shopping_list_routes.route('/')
@login_required
def get_shopping_list():
    shopping_list = db.session.query(ShoppingList).filter(ShoppingList.user_id == current_user.id).all()
    res = {}
    for item in shopping_list:
        ingredient = db.session.query(Ingredient).filter(Ingredient.id == item.ingredient_id).first()
        item_dict = item.to_dict()
        item_dict['ingredient'] = ingredient.to_dict()
        res[item.id] = item_dict
    return res




# Delete all shopping list items
@shopping_list_routes.route('/delete/', methods=['DELETE'])
@login_required
def delete_shopping_list():
    shopping_list = db.session.query(ShoppingList).filter(ShoppingList.user_id == current_user.id).all()
    if shopping_list is None:
        return {'errors': ['Shopping list not found']}, 404
    else:
        for item in shopping_list:
            db.session.delete(item)
            db.session.commit()
        return {'message': 'Shopping list deleted'}



# Delete shopping list item
@shopping_list_routes.route('/delete/<int:id>/', methods=['DELETE'])
@login_required
def delete_shopping_list_item(id):
    shopping_list_item = db.session.query(ShoppingList).filter(ShoppingList.id == id).first()
    if shopping_list_item is None:
        return {'errors': ['Shopping list item not found']}, 404
    else:
        db.session.delete(shopping_list_item)
        db.session.commit()
        return {'message': 'Shopping list item deleted'}



# Update shopping list item
@shopping_list_routes.route('/update/<int:id>/', methods=['PUT'])
@login_required
def update_shopping_list_item(id):
    shopping_list_item = db.session.query(ShoppingList).filter(ShoppingList.id == id).first()
    if shopping_list_item is None:
        return {'errors': ['Shopping list item not found']}, 404
    else:
        shopping_list_item.quantity = request.json['quantity']
        db.session.commit()
        return {'message': 'Shopping list item updated'}
