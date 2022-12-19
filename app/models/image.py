from .db import db
from flask_login import UserMixin

class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='images', foreign_keys=[recipe_id])

    @property
    def image_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "recipe_id": self.recipe_id
        }
