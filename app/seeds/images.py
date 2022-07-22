from app.models import db, Image

def seed_images():
    img1 = Image(
        spot_id=1,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons1-1.png'
    )
    img1_2 = Image(
        spot_id=1,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons1-2.png'
    )
    img2 = Image(
        spot_id=2,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons2-1.png'
    )
    img2_2 = Image(
        spot_id=2,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons2-2.png'
    )
    img2_3 = Image(
        spot_id=2,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons2-3.png'
    )
    img3 = Image(
        spot_id=3,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons3-1.png'
    )
    img3_2 = Image(
        spot_id=3,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons3-2.png'
    )
    img3_3 = Image(
        spot_id=3,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/hamptons3-3.png'
    )
    img4 = Image(
        spot_id=4,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan1-1.png'
    )
    img4_2 = Image(
        spot_id=4,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan1-2.png'
    )
    img4_3 = Image(
        spot_id=4,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan1-3.png'
    )
    img5 = Image(
        spot_id=5,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan2-1.png'
    )
    img5_2 = Image(
        spot_id=5,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan2-2.png'
    )
    img5_3 = Image(
        spot_id=5,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/manhattan2-3.png'
    )
    img6 = Image(
        spot_id=6,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/chicago1-1.png'
    )
    img6_2 = Image(
        spot_id=6,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/chicago1-2.png'
    )
    img6_3 = Image(
        spot_id=6,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/chicago1-3.png'
    )
    img7 = Image(
        spot_id=7,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/dallas1-1.png'
    )
    img7_2 = Image(
        spot_id=7,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/dallas1-2.png'
    )
    img7_3 = Image(
        spot_id=7,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/dallas1-3.png'
    )
    img8 = Image(
        spot_id=8,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/boston1-1.png'
    )
    img8_2 = Image(
        spot_id=8,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/boston1-2.png'
    )
    img8_3 = Image(
        spot_id=8,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/boston1-3.png'
    )
    img9_2 = Image(
        spot_id=9,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/sf1-2.png'
    )
    img9_3 = Image(
        spot_id=9,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/sf1-3.png'
    )
    img10_2 = Image(
        spot_id=10,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/losaltos1-2.png'
    )
    img10_3 = Image(
        spot_id=10,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/losaltos1-3.png'
    )
    img11 = Image(
        spot_id=11,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/losaltos2-1.png'
    )
    img11_2 = Image(
        spot_id=11,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/losaltos2-2.png'
    )
    img11_3 = Image(
        spot_id=11,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/losaltos2-3.png'
    )
    img12_2 = Image(
        spot_id=12,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/bh1-2.png'
    )
    img12_3 = Image(
        spot_id=12,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/bh1-3.png'
    )
    img13_2 = Image(
        spot_id=13,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/miami1-2.png'
    )
    img13_3 = Image(
        spot_id=13,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/miami1-3.png'
    )
    img14_2 = Image(
        spot_id=14,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/bh2-2.png'
    )
    img14_3 = Image(
        spot_id=14,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/bh2-3.png'
    )
    img15_2 = Image(
        spot_id=15,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/ny1-2.png'
    )
    img15_3 = Image(
        spot_id=15,
        url='https://luxbnb.s3.us-east-2.amazonaws.com/ny1-3.png'
    )


    db.session.add(img1)
    db.session.add(img1_2)
    db.session.add(img2)
    db.session.add(img2_2)
    db.session.add(img2_3)
    db.session.add(img3)
    db.session.add(img3_2)
    db.session.add(img3_3)
    db.session.add(img4)
    db.session.add(img4_2)
    db.session.add(img4_3)
    db.session.add(img5)
    db.session.add(img5_2)
    db.session.add(img5_3)
    db.session.add(img6)
    db.session.add(img6_2)
    db.session.add(img6_3)
    db.session.add(img7)
    db.session.add(img7_2)
    db.session.add(img7_3)
    db.session.add(img8)
    db.session.add(img8_2)
    db.session.add(img8_3)
    db.session.add(img9_2)
    db.session.add(img9_3)
    db.session.add(img10_2)
    db.session.add(img10_3)
    db.session.add(img11)
    db.session.add(img11_2)
    db.session.add(img11_3)
    db.session.add(img12_2)
    db.session.add(img12_3)
    db.session.add(img13_2)
    db.session.add(img13_3)
    db.session.add(img14_2)
    db.session.add(img14_3)
    db.session.add(img15_2)
    db.session.add(img15_3)
    

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()