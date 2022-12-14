from .db import db
from flask_login import UserMixin

class Rating(db.Model, UserMixin):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    user = db.relationship('User', back_populates='ratings', foreign_keys=[user_id])
    recipe = db.relationship('Recipe', back_populates='rating', foreign_keys=[recipe_id])

    @property
    def rating_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }
