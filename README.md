# ![Logo](react-app/src/components/logo.png)&nbsp;&nbsp;&nbsp;**CookBook**
## Bienvenue et Bon Appetit!

[CookBook](https://cookbook-khz.herokuapp.com/) takes heavy inspiration from the [New York Times Cooking](https://cooking.nytimes.com/). With a similar goal of providing a platform to share good food from anywhere the internet can reach, users can upload their own recipes for others to try, or try recipes others have uploaded.

This application takes advantage of [Flask](https://flask.palletsprojects.com/en/2.2.x/), [WTForms](https://wtforms.readthedocs.io/en/3.0.x/), [SQLAlchemy](https://www.sqlalchemy.org/), and [Alembic](https://alembic.sqlalchemy.org/en/latest/) in the backend for ease of use, and [React](https://reactjs.org/) & [Redux](https://redux.js.org/) in the frontend for its ability to quickly navigate across the app.
## [**Live Link**](https://khz538-nyt-cooking.herokuapp.com/)
## Wiki
Take a gander at the [Wiki](https://github.com/khz538/nyt-cooking-clone/wiki) for some information about the app.
There, you can find the Feature List, User Stories, the backend Database Schema, and a look at the site under wireframe that inspired the look and feel of the app!

## Gallery
### **Home Page**
![CookBook Home](readme/Screenshot%202022-09-12%20at%2007-43-42%20CookBook.png)
### **Log In Page**


![CookBook Log In](readme/Screenshot%202022-09-12%20at%2007-44-26%20CookBook.png)

### **Sign Up Page**
![CookBook Sign Up](readme/Screenshot%202022-09-12%20at%2007-44-39%20CookBook.png)

### **Recipe View when not the Author**
![CookBook Recipe](readme/Screenshot%202022-09-12%20at%2007-45-07%20CookBook.png)

### **Recipe View when the Author**
![CookBook Recipe Editable](readme/Screenshot%202022-09-12%20at%2007-45-27%20CookBook.png)

### **Edit Recipe Details**
![CookBook Edit Recipe](readme/Screenshot%202022-09-12%20at%2007-45-52%20CookBook.png)

### **Edit Ingredient**
![CookBook Edit Ingredient](readme/Screenshot%202022-09-12%20at%2007-46-02%20CookBook.png)


### **Edit Step**
![CookBook Edit Step](readme/Screenshot%202022-09-12%20at%2007-46-13%20CookBook.png)


## How to run this application

1. Clone the main branch of this public repo
2. Create a `.env` file in root and model it after the `.env.example` file in the repository
3. Install pipenv on your machine if you have not already
4. Run `pipenv install -r requirements.txt` in the root directory
5. cd into the `react-app` directory and run `npm i` to install the dependencies there
6. Once all dependencies are installed, open two terminals--one in the root, and one in the `react-app` dir
7. In the root terminal, run `pipenv run flask run` to start the backend server
8. In the `react-app` terminal, run `npm start` to start the React front end
9. The application should open in your browser automatically

## Adding to this project
* Finish those features in the wiki that are not yet implemented, including search, grocery list, and recipe notes
* Add buttons to toggle the add ingredient & add step forms so the page looks nicer when logged in as the author
* For the same purpose, add a menu button to each ingredient and step to show the edit and delete buttons when logged in as the author
* Add user profiles so users can see their submissions all in one place
