from app.models import db, Image

# Adds images
def seed_images():
    a = Image(
        url='https://res.cloudinary.com/khz538/image/upload/v1662977642/CookBook/2_lklvao.jpg',
        recipe_id=2,
    )
    b = Image(
        url='https://res.cloudinary.com/khz538/image/upload/v1662977641/CookBook/1_b7dqso.jpg',
        recipe_id=3,
    )
    c = Image(
        url='https://res.cloudinary.com/khz538/image/upload/v1662977643/CookBook/4_unfuxb.jpg',
        recipe_id=4,
    )
    d = Image(
        url='https://res.cloudinary.com/khz538/image/upload/v1662977636/CookBook/8_napifv.jpg',
        recipe_id=5,
    )
    e = Image(
        url='https://res.cloudinary.com/khz538/image/upload/v1662976803/CookBook/3_lhyhih.jpg',
        recipe_id=1,
    )
    f = Image(
        url="https://twoplaidaprons.com/wp-content/uploads/2022/06/tomato-egg-sitr-fry.jpg",
        recipe_id=6,
    )

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)
    db.session.add(e)
    db.session.add(f)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
