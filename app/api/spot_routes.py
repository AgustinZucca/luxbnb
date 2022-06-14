from crypt import methods
from app.forms.new_spot_form import CreateSpotForm
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Spot
from app.awsS3.py import 


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
@login_required
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
            user_id = 1,
            image = form.data['image'],
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
        spot.image = form.data['image'],
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

    return

@spot_routes.route("/images", methods=['POST'])
@login_required
def add_spot_images():
    newFile = request.form.get('newFile')
    if newFile == 'true':
        if "file" not in request.files:
            return "No user_file key in request.files"
        file = request.files['file']

        if file:
            spot_id = request.form.get('spot_id')
            file_url = upload_file_to_s3(file)
            # file_url = file_url.replace(" ", "+")
            image = Image(spot_id=spot_id, url=file_url["url"])
            db.session.add(image)
            db.session.commit()

    if newFile == 'false':
        spot_id = request.form.get('spot_id')
        url = request.form.get('file')
        image = Image(spot_id=spot_id, url=url)
        db.session.add(image)
        db.session.commit()

    return {'message': 'okay'}