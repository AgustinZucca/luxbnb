from app.forms.new_spot_form import CreateSpotForm
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Spot

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
            country = form.data['country'],
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