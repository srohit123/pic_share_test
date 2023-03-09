import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from "react-router-dom";

import { HOME, FAVOURITES, LOGIN, ROOT } from './utils/routesConstants';

import Header from './components/Header';
import CardsContainer from './components/CardsContainer';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ToastContainer autoClose={2000} />
      {
        <Routes>
          <Route
            path={ROOT}
            element={<CardsContainer />}
          />
          <Route
            path={LOGIN}
            element={<Login />}
          />
          <Route
            path={HOME}
            element={<CardsContainer />}
          />
          <Route
            path={FAVOURITES}
            element={<CardsContainer />}
          />
          <Route
            path="*"
            element={<Navigate to={HOME} />}
          />
        </Routes>
      }
    </div>
  );
}

export default App;
