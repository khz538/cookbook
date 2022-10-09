import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import RecipeDetail from './components/RecipeDetail';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import PageNotFound from './components/PageNotFound';
import { authenticate } from './store/session';
import BottomBar from './components/BottomBar';
import ShoppingList from './components/ShoppingList';
// import Navigation from './components/Navigation';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      {/* <Navigation /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <Recipes />
        </ProtectedRoute>
        <Route path='/recipes/new' exact={true}>
          <AddRecipe />
        </Route>
        <Route path='/recipes/:recipeId' exact={true}>
          <RecipeDetail />
        </Route>
        <Route path='/shopping-list' exact={true}>
          <ShoppingList />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;
