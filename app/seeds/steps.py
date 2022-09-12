from app.models import db, Step, recipe


# Add steps for the recipes
def seed_steps():
    a = Step(
        description='Heat the oven to 425 degrees. On a large rimmed sheet pan, drizzle the mushrooms and red onion with 3 tablespoons oil. Sprinkle with cumin, coriander, paprika (if using), 1 teaspoon salt and ½ teaspoon pepper; toss to coat. Arrange in an even layer and roast until tender and browned, about 20 minutes. Add the pitas directly to the oven rack to warm during the last 5 minutes of cooking.', recipe_id=1)
    b = Step(
        description='Meanwhile, toss cabbage with remaining 2 teaspoons oil in a medium bowl; toss to coat. Season generously with salt and pepper. In a small bowl, stir together yogurt and turmeric; season with salt and pepper.', recipe_id=1)
    c = Step(
        description='To serve, slather yogurt over warm pitas. Top with cabbage, mushroom mixture and herbs, and serve immediately.', recipe_id=1)

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)

    db.session.commit()


def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
