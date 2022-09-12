from app.models import db, Ingredient

# Adds ingredients
def seed_ingredients():
    a = Ingredient(
        quantity=.75,
        unit='cup(s)',
        name='milk',
        recipe_id=2,
    )
    b = Ingredient(
        quantity=4,
        unit='quart(s)',
        name='vinegar',
        recipe_id=2,
    )
    c = Ingredient(
        quantity=2,
        unit='gram(s)',
        name='salt',
        recipe_id=2,
    )

    # db.session.add(seed1)
    # db.session.add(seed2)
    # db.session.add(seed3)

    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
