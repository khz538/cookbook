import email
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name = 'User', password='password')
    rafa = User(
        username='rafa', email='rafa@aa.io', first_name='Rafa', last_name = 'Nadal', password='password')
    serena = User(
        username='serena', email='serena@aa.io', first_name='Serena', last_name='Williams', password='password')
    novak = User(
        username='novak', email='novak@aa.io', first_name='Novak', last_name='Djokovic', password='password')
    emma = User(
        username='emma', email='emma@aa.io', first_name='Emma', last_name='Raducanu', password='password')

    db.session.add(demo)
    db.session.add(novak)
    db.session.add(rafa)
    db.session.add(serena)
    db.session.add(emma)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
