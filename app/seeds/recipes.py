from pydoc import describe
from app.models import db, Recipe


# Adds recipes
def seed_recipes():
    recipe1 = Recipe(
        title='Vegetarian Mushroom Shawarma Pitas',
        description='Dusted with smoky spices like cumin, coriander and paprika, these thick-cut roasted portobello mushrooms are inspired by shawarma, Middle Eastern spiced lamb — and they taste surprisingly meaty. The flavors are bold, but the prep is simple: While the mushrooms and onions roast, make an easy turmeric and Greek yogurt sauce, and toss sliced red cabbage with salt. Pile everything into a pita with a flurry of cilantro and mint to freshen things up (parsley or salad greens would also do the job in a pinch). While these hearty pitas are best enjoyed with a knife and fork as open-faced sandwiches, they can also be folded into half-moon parcels and eaten out of hand.',
        time='25 minutes',
        yield_servings = 4,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1662976803/CookBook/3_lhyhih.jpg',
        user_id=5
    )
    recipe2 = Recipe(
        title='Whole Roasted Cauliflower With Almond-Herb Sauce',
        description='This striking dish has become a modern classic, as chefs around the world are working out new ways to push vegetables into the center of the plate. It makes a lovely vegetarian main course after a pasta intro, or a gorgeous side dish for lamb or fish. Omit the anchovies in the sauce, and it becomes entirely vegetarian; replace the butter with more olive oil, and it turns vegan. Try using pale orange, green or purple cauliflower, or a head of spiky, psychedelic Romanesco. Carve it at the table, just like a roast, for maximum impact.',
        time='2 hours',
        yield_servings = 2,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1662977642/CookBook/2_lklvao.jpg',
        user_id=4
    )
    recipe3 = Recipe(
        title='Chicken Caesar Salad with Crispy Chickpeas',
        description="This delicious and healthy salad is protein-packed with chicken, chickpeas, and Parmesan cheese. It’s also a great way to use up leftover chicken. If you don’t have any, you can use rotisserie chicken or grilled chicken breasts. The dressing is made with Greek yogurt, which adds a tangy flavor and a creamy texture. The chickpeas are coated in a mixture of olive oil, garlic powder, and salt, then baked until crispy. The salad is topped with croutons, which are made with whole wheat bread and olive oil. This salad is a great way to get your daily dose of vegetables and protein.",
        time='30 minutes',
        yield_servings = 4,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1662977641/CookBook/1_b7dqso.jpg',
        user_id=3
    )
    recipe4= Recipe(
        title='Skewered Beef with Roasted Potatoes and Peppers',
        description="Grilling is a great way to cook meat, but it can be a little tricky to get the timing right. This recipe is a great way to learn how to grill meat. The beef is marinated in a mixture of soy sauce, garlic, and ginger, then skewered with potatoes and peppers. The skewers are grilled until the beef is cooked to your liking. The potatoes and peppers are cooked in the same pan as the beef, so they are ready at the same time. This recipe is a great way to get your daily dose of vegetables and protein.",
        time='1 hour',
        yield_servings = 6,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1662977643/CookBook/4_unfuxb.jpg',
        user_id=2
    )
    recipe5 = Recipe(
        title='Pesto Pasta with Lettuce and Tomatoes',
        description="A twist on a traditional pesto pasta, this recipe adds lettuce and tomatoes. This recipe is made with farfel, which is a small pasta that looks like a cross between a macaroni and a bowtie. It’s a great way to get your daily dose of vegetables and protein. The pesto is made with basil, garlic, pine nuts, and olive oil. The lettuce and tomatoes are added at the end, so they stay crisp and fresh. A fresh, light, but satisfying dish for the whole family to gather around and enjoy on a warm summer day.",
        time='30 minutes',
        yield_servings = 4,
        image_url='https://res.cloudinary.com/khz538/image/upload/v1662977636/CookBook/8_napifv.jpg',
        user_id=1
    )
    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)
    db.session.add(recipe4)
    db.session.add(recipe5)
    db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
