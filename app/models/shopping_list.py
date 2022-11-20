from .db import db
from flask_login import UserMixin


class ShoppingList(db.Model, UserMixin):
    __tablename__ = 'shopping_lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)

    user = db.relationship('User', back_populates='shopping_lists', foreign_keys=[user_id])
    ingredient = db.relationship('Ingredient', back_populates='shopping_lists', foreign_keys=[ingredient_id])

    @property
    def shopping_list_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "ingredient_id": self.ingredient_id
        }
