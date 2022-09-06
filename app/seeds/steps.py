from app.models import db, Step, recipe


# Add steps for the recipes
def seed_steps():
    first = Step(
        description='Testing Step 1!!!!', recipe_id=2)
    second = Step(
        description='Testing Step 2!!!!', recipe_id=2)
    third = Step(
        description='Testing Step 3!!!!', recipe_id=2)

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)

    db.session.commit()


def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
