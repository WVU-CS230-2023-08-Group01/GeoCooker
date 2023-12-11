import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
//import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Home } from "./components/Home";
import AddRecipeForm from "./components/RecipeForm"
import { AuthenticationGuard } from "./components/Authentication/authentication-guard";
import Profile from "./components/Authentication/Profile"
import './custom.css';
import Recipe from './components/Recipe';
import PostData from './components/PostData';
import AddRecipe from './components/AddRecipe';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {/*{AppRoutes.map((route, index) => {*/}
          {/*  const { element, ...rest } = route;*/}
          {/*  return <Route key={index} {...rest} element={element} />;*/}
            {/*})}*/}
            <Route
                path="/"
                element= <Home/>
            />
            {/*<Route*/}
            {/*    path="/Recipe"*/}
            {/*    element=<Recipe />*/}
            {/*/>*/}
            <Route
                path="/Profile"
                element={<AuthenticationGuard component={Profile} />}
            />
            <Route
                path="/AddRecipe"
                element={<AuthenticationGuard component={AddRecipe} />}
                />
            <Route
                path="/conf"
                element={<AuthenticationGuard component={PostData} />}
                />

        </Routes>
      </Layout>
    );
  }
}
