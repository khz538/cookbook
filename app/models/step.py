from .db import db
from flask_login import UserMixin

class Step(db.Model, UserMixin):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='steps', foreign_keys=[recipe_id])

    @property
    def step_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "recipe_id": self.recipe_id
        }
