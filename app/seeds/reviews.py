from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    rev1 = Review(
        user_id=6,
        spot_id=4,
        review='Place could have better hygiene',
        rating=40)
    rev2 = Review(
        user_id=5,
        spot_id=5,
        review='Not close to the city',
        rating=20)
    rev3 = Review(
        user_id=1,
        spot_id=6,
        review='This place is amazing!',
        rating=100)
    rev4 = Review(
        user_id=1,
        spot_id=7,
        review='Cool spot!',
        rating=80)
    rev5 = Review(
        user_id=4,
        spot_id=8,
        review='Okay for the price',
        rating=60)
    rev6 = Review(
        user_id=1,
        spot_id=9,
        review='Place could have better hygiene',
        rating=40)
    rev7 = Review(
        user_id=1,
        spot_id=10,
        review='Not close to the city',
        rating=20)
    rev8 = Review(
        user_id=1,
        spot_id=11,
        review='This place is amazing!',
        rating=100)
    rev9 = Review(
        user_id=1,
        spot_id=12,
        review='Cool spot!',
        rating=80)
    rev10 = Review(
        user_id=3,
        spot_id=10,
        review='Okay for the price',
        rating=60)
    rev11 = Review(
        user_id=1,
        spot_id=11,
        review='Place could have better hygiene',
        rating=40)
    rev12 = Review(
        user_id=2,
        spot_id=12,
        review='Not close to the city',
        rating=20)
    rev13 = Review(
        user_id=1,
        spot_id=13,
        review='This place is amazing!',
        rating=100)
    rev14 = Review(
        user_id=1,
        spot_id=14,
        review='Cool spot!',
        rating=80)
    rev15 = Review(
        user_id=2,
        spot_id=15,
        review='Okay for the price',
        rating=60)
    

    
    db.session.add(rev4)
    db.session.add(rev5)
    db.session.add(rev6)
    db.session.add(rev7)
    db.session.add(rev8)
    db.session.add(rev9)
    db.session.add(rev10)
    db.session.add(rev11)
    db.session.add(rev12)
    db.session.add(rev13)
    db.session.add(rev14)
    db.session.add(rev15)
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()