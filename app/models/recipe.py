from .db import db
from flask_login import UserMixin


class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    time = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    yield_servings = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255))

    user = db.relationship('User', back_populates='recipes', foreign_keys=[user_id])
    rating = db.relationship('Rating', back_populates='recipe', cascade='all, delete')
    ingredients = db.relationship('Ingredient', back_populates='recipe', cascade='all, delete')
    steps = db.relationship('Step', back_populates='recipe', cascade='all, delete')

    @property
    def recipe_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "time": self.time,
            "user_id": self.user_id,
            "yield_servings": self.yield_servings,
            "image_url": self.image_url
        }
