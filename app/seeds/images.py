from app.models import db, Image

def seed_images():
    img1 = Image(
        spot_id=1,
        url='https://content.fortune.com/wp-content/uploads/2015/08/9133oriole004_ps-1.jpg'
    )
    img2 = Image(
        spot_id=2,
        url='https://listingmedia7.harstatic.com/416217462/hr/1.jpeg?ts=2022-05-24T11:13:12.663'
    )
    img3 = Image(
        spot_id=3,
        url='https://photos.zillowstatic.com/fp/784f984ba106ec1f8146c0d026a47c24-uncropped_scaled_within_1536_1152.webp'
    )

    db.session.add(img1)
    db.session.add(img2)
    db.session.add(img3)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()