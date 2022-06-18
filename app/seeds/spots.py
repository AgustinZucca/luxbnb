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
        price='5000')
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
    spot4 = Spot(
        user_id=3,
        address='683 Ocean Rd',
        city='Southampton',
        state='New York',
        name='Hamptons Compound',
        description="Exquisite grace and grandeur hallmark this magnificent masterpiece - beautifully preserving its authentic original details - offering 18,000+ square feet on three floors, including 8 principal bedrooms, 8 full and three half baths, and separate staff quarters. Basking in 10 +/- acres of park-like privacy on exclusive Ox Pasture Road, Linden sits in the heart of the Estate Section.",
        beds='8',
        baths='9',
        price='25000')
    spot5 = Spot(
        user_id=2,
        address='432 Newark Rd',
        city='Southampton',
        state='New Jersey',
        name='Calm on the River',
        description="Beautiful established home by the river. Come enjoy the breathtaking nature by staying at our place.",
        beds='8',
        baths='9',
        price='4500')
    spot6 = Spot(
        user_id=2,
        address='900 Pebble Ln',
        city='Southampton',
        state='New York',
        name='New Hamptons Mansion',
        description="Located between the oceanfront Maidstone Club and Main Street shopping, this stunning new traditional style home built custom by Ben Krupinksi Builder was just finished in 2022 is perfectly sited on a south-facing acre in East Hampton Village South.",
        beds='7',
        baths='7',
        price='10000')
    spot7 = Spot(
        user_id=2,
        address='45 St',
        city='New York',
        state='New York',
        name='Manhattan Penthouse',
        description="Set atop a landmark condominium in Soho rests this exquisite Corner Penthouse Duplex Loft boasting 2,421 sq ft of impeccably renovated interiors and an enormous rooftop terrace.",
        beds='2',
        baths='3',
        price='10000')
    spot8 = Spot(
        user_id=2,
        address='6th St',
        city='New York',
        state='New York',
        name='King Penthouse',
        description="Set atop a landmark condominium in Soho rests this exquisite Corner Penthouse Duplex Loft boasting 2,421 sq ft of impeccably renovated interiors and an enormous rooftop terrace.",
        beds='3',
        baths='4',
        price='12000')
    spot9 = Spot(
        user_id=3,
        address='1987 Stoney Rd',
        city='Chicago',
        state='Illinois',
        name='Modern Chicago Vibes',
        description="Meticulously designed for family living and sustainability, this contemporary 10,400 square foot, 5 bedroom home on a 45 x 145 foot lot is among the newest additions to Chicago's historic Astor Street District.",
        beds='5',
        baths='5',
        price='6000')
    spot10 = Spot(
        user_id=3,
        address='10333 Woodford Dr',
        city='Dallas',
        state='Texas',
        name='Mansion in Dallas',
        description="Certain expectations come with living in certain zip codes at certain price points. Effortlessly exceeding them all is this 12,379 sq ft Simmie Cooper custom build 2010. The exclusive estate neighborhood combined with the home's intuitive layout, luxe amenities, extensive custom upgrades and handsome contemporary finishes, create a sense of having arrived.",
        beds='3',
        baths='4',
        price='9000')
    spot11 = Spot(
        user_id=3,
        address='55 Commercial Wharf #12',
        city='Boston',
        state='Massachusetts',
        name='Boston Lux Aparment',
        description="Exceptional designer waterfront home. Two combined floor-through units create a rare and coveted floor plan that lives like a single family with the ease of one floor living.  Customized 3 bed 3 bath expands across two wings with 2565 sq ft. Live, entertain and dine in one wing and retreat to a separate primary suite sanctuary in the other.",
        beds='3',
        baths='3',
        price='7000')
    

    db.session.add(spot1)
    db.session.add(spot2)
    db.session.add(spot3)
    db.session.add(spot4)
    db.session.add(spot5)
    db.session.add(spot6)
    db.session.add(spot7)
    db.session.add(spot8)
    db.session.add(spot9)
    db.session.add(spot10)
    db.session.add(spot11)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()