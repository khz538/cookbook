from app.models import db, Ingredient

# Adds ingredients
def seed_ingredients():
    seed1 = Ingredient(
        quantity=4,
        unit='cups',
        name='milk',
        recipe_id=2,
    )
    seed2 = Ingredient(
        quantity=4,
        unit='quarts',
        name='vinegar',
        recipe_id=2,
    )
    seed3 = Ingredient(
        quantity=2,
        unit='grams',
        name='salt',
        recipe_id=2,
    )

    db.session.add(seed1)
    db.session.add(seed2)
    db.session.add(seed3)

    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
