from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Rating
from app.forms import RatingForm
from .auth_routes import validation_errors_to_error_messages

rating_routes = Blueprint('ratings', __name__)

# Delete a rating
@rating_routes.route('/<int:rating_id>/', methods=['DELETE'])
@login_required
def delete_rating(rating_id):
    rating = db.session.query(Rating).get(rating_id)
    if rating is None:
        return {'errors': ['Rating not found']}, 404
    elif rating.user_id != current_user.id:
        return {'errors': ['You are not authorized to delete this rating']}, 401
    else:
        db.session.delete(rating)
        db.session.commit()
        return rating.to_dict()


# Edit a rating
@rating_routes.route('/<int:rating_id>/', methods=['PUT'])
@login_required
def edit_rating(rating_id):
    rating = db.session.query(Rating).get(rating_id)
    if rating is None:
        return {'errors': ['Rating not found']}, 404
    elif rating.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this rating']}, 401
    elif rating:
        form = RatingForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            rating.rating = form.data['rating']
            db.session.commit()
            return rating.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
