import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateSpot from './components/spots/CreateSpot';
import SingleSpot from './components/spots/SingleSpotPage';
import EditSpot from './components/spots/EditSpot';
import Feed from './components/Feed';
import AboutMe from './components/Aboutme';
import Footer from './components/Footer';
import UserBookings from './components/UserBookings';
import PageNotFound from './components/PageNotFound';



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
      <Footer />
      <Switch>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/bookings' exact={true} >
          <UserBookings />
        </ProtectedRoute>
        <ProtectedRoute path='/spots/new' exact={true} >
          <CreateSpot />
        </ProtectedRoute>
        <ProtectedRoute path='/spots/:spotId' exact={true} >
          <SingleSpot />
        </ProtectedRoute>
        <ProtectedRoute path='/spots/:spotId/edit' exact={true} >
          <EditSpot />
        </ProtectedRoute>
        <Route path='/aboutme' exact={true} >
          <AboutMe />
        </Route>
        <Route path='/' exact={true} >
          <Feed />
        </Route>
        <PageNotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
