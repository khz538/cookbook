from app.models import db, Recipe


# Adds recipes
def seed_recipes():
    recipe1 = Recipe(
        title='Three Sisters Bean Patties With Raspberry Aioli',
        description='The Three Sisters — corn, beans and squash — are foundational foods of the Haudenosaunee people. This recipe is an Indigenous-inspired twist on falafel that brings together the sweetness of squash with savory red beans and cornmeal. Combined with an easy raspberry aioli, these nutritious patties can be eaten alone, tossed in salads or tucked into sandwiches.',
        time='2 hours',
        yield_servings = 4,
        image_url='https://static01.nyt.com/images/2022/08/31/dining/31GARDENSrex2-1/merlin_211376418_8eaf5162-49a1-4a95-a3f7-46e89a62dadf-articleLarge.jpg?w=1280&q=75'
    )

    db.session.add(recipe1)
    db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
