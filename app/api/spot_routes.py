from crypt import methods
from app.forms.new_spot_form import CreateSpotForm
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Spot, Image
from app.awsS3 import allowed_file, get_unique_filename, upload_file_to_s3




spot_routes = Blueprint('spots', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    # print("HERE ARE ERROR MESSAGES \n\n", errorMessages)
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# Get all spots
@spot_routes.route('/')
def spots():
    spots = Spot.query.all()

    return {'spots': [spot.to_dict() for spot in spots]}


#Get one spot
@spot_routes.route('/<int:id>')
@login_required
def spot(id):
    spot = Spot.query.get(id)
    return spot.to_dict()


#Create a spot
@spot_routes.route('/new', methods=['POST'])
@login_required
def newSpot():
    form = CreateSpotForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        
        newSpot = Spot(
            user_id = request.json['userId'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            name = form.data['name'],
            description = form.data['description'],
            beds = form.data['beds'],
            baths = form.data['baths'],
            price = form.data['price']
        )

        db.session.add(newSpot)
        db.session.commit()
        return newSpot.to_dict()


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#EDIT SPOT
@spot_routes.route('/<int:spotId>/edit', methods=['PUT'])
@login_required
def editSpot(spotId):
    spot = Spot.query.get(spotId)

    form = CreateSpotForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spot.address = form.data['address'],
        spot.city = form.data['city'],
        spot.state = form.data['state'],
        spot.name = form.data['name'],
        spot.description = form.data['description'],
        spot.beds = form.data['beds'],
        spot.baths = form.data['baths'],
        spot.price = form.data['price']

        db.session.add(spot)
        db.session.commit()
        return spot.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

#Delete Spot
@spot_routes.route('/<int:spotId>/delete', methods=['DELETE'])
@login_required
def deleteSpot(spotId):
    spot = Spot.query.get(spotId)

    db.session.delete(spot)
    db.session.commit()

    return spot

@spot_routes.route("/images/<int:spot_id>", methods=['POST'])
@login_required
def add_spot_images(spot_id):

    if "img_url" in request.files:

            image = request.files["img_url"]
            if not allowed_file(image.filename):

                return {"errors": ["Image file type not permitted"]}, 400


            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]


            new_image = Image(spot_id=spot_id, url=url)
            db.session.add(new_image)
            db.session.commit()
            return {"url": url}
            
    return {'errors': 'Image upload failed'}
    

@spot_routes.route("/images/<int:img_id>/delete", methods=['DELETE'])
@login_required
def remove_spot_image(img_id):
    img = Image.query.get(img_id)
    db.session.delete(img)
    db.session.commit()
    return {'message': 'success'}