from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Step
from app.forms import StepForm
from .auth_routes import validation_errors_to_error_messages

step_routes = Blueprint('steps', __name__)

# Edit a step
@step_routes.route('/<int:step_id>', methods=['PUT'])
@step_routes.route('<int:step_id>/', methods=['PUT'])
@login_required
def edit_step(step_id):
    step = db.session.query(Step).get(step_id)
    if step is None:
        return {'errors': ['Step not found']}, 404
    elif step.recipe.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this step']}, 401
    elif step:
        form = StepForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            step.step_number = form.data['step_number']
            step.description = form.data['description']
            db.session.commit()
            return step.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Delete a step
@step_routes.route('/<int:step_id>/delete/', methods=['DELETE'])
@step_routes.route('/<int:step_id>/delete', methods=['DELETE'])
@login_required
def delete_step(step_id):
    step = db.session.query(Step).get(step_id)
    if step is None:
        return {'errors': ['Step not found']}, 404
    elif step.recipe.user_id != current_user.id:
        return {'errors': ['You are not authorized to delete this step']}, 401
    else:
        db.session.delete(step)
        db.session.commit()
        return step.to_dict()
