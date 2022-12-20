from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from .aws import upload_file_to_s3, allowed_file, get_unique_filename


image_routes = Blueprint('images', __name__)

# Upload image to S3
@image_routes.route('/upload/', methods=["POST"])
@login_required
def upload_image():
    print("request", request.files)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    image = Image(
        url=url,
        recipe_id=request.form["recipe_id"]
    )

    db.session.add(image)
    db.session.commit()

    return image.to_dict()
