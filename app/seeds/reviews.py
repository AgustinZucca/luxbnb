from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    rev1 = Review(
        user_id=2,
        spot_id=1,
        review='This place is amazing!',
        rating=100)
    rev2 = Review(
        user_id=3,
        spot_id=2,
        review='Cool spot!',
        rating=80)
    rev3 = Review(
        user_id=3,
        spot_id=3,
        review='Okay for the price',
        rating=60)
    rev4 = Review(
        user_id=6,
        spot_id=4,
        review='Place could have better hygiene',
        rating=40)
    rev5 = Review(
        user_id=5,
        spot_id=5,
        review='Not close to the city',
        rating=20)
    rev6 = Review(
        user_id=1,
        spot_id=6,
        review='This place is amazing!',
        rating=100)
    rev7 = Review(
        user_id=1,
        spot_id=7,
        review='Cool spot!',
        rating=80)
    rev8 = Review(
        user_id=4,
        spot_id=8,
        review='Okay for the price',
        rating=60)
    rev9 = Review(
        user_id=1,
        spot_id=9,
        review='Place could have better hygiene',
        rating=40)
    rev10 = Review(
        user_id=1,
        spot_id=10,
        review='Not close to the city',
        rating=20)
    rev11 = Review(
        user_id=1,
        spot_id=11,
        review='This place is amazing!',
        rating=100)
    rev12 = Review(
        user_id=1,
        spot_id=12,
        review='Cool spot!',
        rating=80)
    rev13 = Review(
        user_id=3,
        spot_id=13,
        review='Okay for the price',
        rating=60)
    rev14 = Review(
        user_id=1,
        spot_id=14,
        review='Place could have better hygiene',
        rating=40)
    rev15 = Review(
        user_id=2,
        spot_id=15,
        review='Not close to the city',
        rating=20)
    rev16 = Review(
        user_id=1,
        spot_id=16,
        review='This place is amazing!',
        rating=100)
    rev17 = Review(
        user_id=1,
        spot_id=17,
        review='Cool spot!',
        rating=80)
    rev18 = Review(
        user_id=2,
        spot_id=18,
        review='Okay for the price',
        rating=60)
    

    db.session.add(rev1)
    db.session.add(rev2)
    db.session.add(rev3)
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
    db.session.add(rev16)
    db.session.add(rev17)
    db.session.add(rev18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()