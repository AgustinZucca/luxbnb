from app.models import db, Spot


# Adds a demo user, you can add other users here if you want
def seed_spots():
    spot1 = Spot(
        user_id=1,
        address='2456 Pecan Road',
        city='Los Angeles',
        state='California',
        name='Beauty On the Hills',
        description='Relax at this beautiful hosue on the hills of Los Angeles.',
        beds='4',
        baths='5',
        price='500')
    spot2 = Spot(
        user_id=2,
        address='1469 Sunshine Ln',
        city='Houston',
        state='Texas',
        name='Texan Palace',
        description="An unparalleled offering, a showplace of the highest caliber, this fully automated smart home sits on nearly 4 acres of gated grounds in exclusive Southlake minutes from Lake Grapevine! It offers every amenity imaginable, palatial living spaces, wine room, grand dining, balcony w-panoramic views, impeccable Chef's Kit, executive study all w-exquisite finishes & details.",
        beds='8',
        baths='10',
        price='12000')
    spot3 = Spot(
        user_id=3,
        address='9881 SW 68th St',
        city='Miami',
        state='Florida',
        name='Oasis in Miami',
        description="Spectacular gated estate set on over an acre of lushly landscaped grounds. Elegant, modern-style home completed in 2018 w/the finest fixtures & finishes throughout including porcelain tile flooring & floating staircase w/glass railings. ",
        beds='6',
        baths='7',
        price='5000')
    

    db.session.add(spot1)
    db.session.add(spot2)
    db.session.add(spot3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()