from .db import db
from flask_login import UserMixin

class Ingredient(db.Model, UserMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String)
    name = db.Column(db.String)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='ingredients', foreign_keys=[recipe_id])

    @property
    def ingredient_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "unit": self.unit,
            "name": self.name,
            "recipe_id": self.recipe_id
        }
