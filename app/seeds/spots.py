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
        user_id=4,
        address='683 Ocean Rd',
        city='Southampton',
        state='New York',
        name='Hamptons Compound',
        description="Exquisite grace and grandeur hallmark this magnificent masterpiece - beautifully preserving its authentic original details - offering 18,000+ square feet on three floors, including 8 principal bedrooms, 8 full and three half baths, and separate staff quarters. Basking in 10 +/- acres of park-like privacy on exclusive Ox Pasture Road, Linden sits in the heart of the Estate Section.",
        beds='8',
        baths='9',
        price='25000')
    spot5 = Spot(
        user_id=5,
        address='432 Newark Rd',
        city='Southampton',
        state='New Jersey',
        name='Calm on the River',
        description="Beautiful established home by the river. Come enjoy the breathtaking nature by staying at our place.",
        beds='8',
        baths='9',
        price='4500')
    spot6 = Spot(
        user_id=6,
        address='900 Pebble Ln',
        city='Southampton',
        state='New York',
        name='New Hamptons Mansion',
        description="Located between the oceanfront Maidstone Club and Main Street shopping, this stunning new traditional style home built custom by Ben Krupinksi Builder was just finished in 2022 is perfectly sited on a south-facing acre in East Hampton Village South.",
        beds='7',
        baths='7',
        price='10000')
    spot7 = Spot(
        user_id=1,
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
        user_id=4,
        address='10333 Woodford Dr',
        city='Dallas',
        state='Texas',
        name='Mansion in Dallas',
        description="Certain expectations come with living in certain zip codes at certain price points. Effortlessly exceeding them all is this 12,379 sq ft Simmie Cooper custom build 2010. The exclusive estate neighborhood combined with the home's intuitive layout, luxe amenities, extensive custom upgrades and handsome contemporary finishes, create a sense of having arrived.",
        beds='3',
        baths='4',
        price='9000')
    spot11 = Spot(
        user_id=5,
        address='55 Commercial Wharf #12',
        city='Boston',
        state='Massachusetts',
        name='Boston Lux Aparment',
        description="Exceptional designer waterfront home. Two combined floor-through units create a rare and coveted floor plan that lives like a single family with the ease of one floor living.  Customized 3 bed 3 bath expands across two wings with 2565 sq ft. Live, entertain and dine in one wing and retreat to a separate primary suite sanctuary in the other.",
        beds='3',
        baths='3',
        price='7000')
    spot12 = Spot(
        user_id=6,
        address='2000 Washington, #7',
        city='San Francisco',
        state='California',
        name='Bay Area High Life',
        description="Designed by architect Andrew Skurman, whose design for the Penthouse received the Julia Morgan Award from the Institute of Classical Architecture & Arts, the residence is distinguished by a sweeping suite of grand yet elegant entertaining rooms from entrance gallery to living room, family room, expansive kitchen & formal dining room.",
        beds='4',
        baths='5',
        price='9000')
    spot13 = Spot(
        user_id=1,
        address='24301 Elise Ct',
        city='Los Altos Hills',
        state='California',
        name='Privacy in the Hills',
        description="Due to the architecture's complexity and the opportunities of the views, one begins to fully grasp the ambition of the undertaking. The architect and the owner analyzed every aspect of the experience, including examining the neighborhood, exploring sight lines, light conditions, and space progressions based on their experience through an intimate study of the topography. ",
        beds='5',
        baths='5',
        price='9500')
    spot14 = Spot(
        user_id=2,
        address='10560 Blandor Way',
        city='Los Altos Hills',
        state='California',
        name='Sweeping Bay Views',
        description="Custom contemporary with sweeping San Francisco Bay views from almost every room on more than 1.2 gated acres. Indoor/outdoor livability is a signature of the home, including wraparound grounds with rare drivable landscaping that creates the perfect venue for car shows.",
        beds='4',
        baths='5',
        price='9200')
    spot15 = Spot(
        user_id=3,
        address='67 Beverly Park Court',
        city='Beverly Hills',
        state='California',
        name='Hollywood Golden Era',
        description="Large Motor Court with Central Fountain leads to Grand Stone Entry to Center Hall and Massive Public rooms with 20' ceilings and stone floors. Ancient Stone Fireplaces. Living Room overlooks acres of grassy yard.",
        beds='12',
        baths='14',
        price='15000')
    spot16 = Spot(
        user_id=4,
        address='130 Palm Ave',
        city='Miami Beach',
        state='Florida',
        name='Vice City Mansion',
        description="One of the finest custom-built homes on its way to completion adorned with intricate design in marble, wood and brass works. Kobi Karp architecture in collaboration with Argent Design working together to create this innovative, visually stunning Stately estate with finishes and details of the highest quality.",
        beds='11',
        baths='12',
        price='8000')
    spot17 = Spot(
        user_id=5,
        address='1109 Calle Vista Drive',
        city='Beverly Hills',
        state='California',
        name='Beverly Hills Living',
        description="This 6 year new museum quality masterpiece, custom designed by Richard Manion and built by Peter McCoy, is truly a rare offering. Located in the most exclusive area North of Sunset in Beverly Hills, the bold architectural gated entry and completely private 1.4 acre property features an expansive motor court, and dramatic entry. Soaring ceilings with voluminous spaces which open to the vast outdoor decks and massive lawns.",
        beds='6',
        baths='10',
        price='10800')
    spot18 = Spot(
        user_id=6,
        address='54 East 64th Street',
        city='New York',
        state='New York',
        name='Heart of Manhattan',
        description="The Internationally known designer couple who own this house have spent decades creating several masterpiece homes, in both country and urban settings. The original architects, Flagg and Chambers, created a mansion built to grand proportions with beautiful large-scale, high-ceilinged rooms. The current owners have undertaken a gut renovation with the latest mechanical systems artfully hidden, and the massive wide windows afford exceptionally bright sunny interiors.",
        beds='6',
        baths='6',
        price='11500')
    

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
    db.session.add(spot12)
    db.session.add(spot13)
    db.session.add(spot14)
    db.session.add(spot15)
    db.session.add(spot16)
    db.session.add(spot17)
    db.session.add(spot18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()