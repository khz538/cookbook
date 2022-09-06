from app.models import db, Recipe


# Adds recipes
def seed_recipes():
    recipe1 = Recipe(
        title='Three Sisters Bean Patties With Raspberry Aioli',
        description='The Three Sisters — corn, beans and squash — are foundational foods of the Haudenosaunee people. This recipe is an Indigenous-inspired twist on falafel that brings together the sweetness of squash with savory red beans and cornmeal. Combined with an easy raspberry aioli, these nutritious patties can be eaten alone, tossed in salads or tucked into sandwiches.',
        time='2 hours',
        yield_servings = 4,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg',
        user_id=1
    )

    db.session.add(recipe1)
    db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
