import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import  AddRecipe  from "./components/AddRecipe"
import { AuthenticationGuard } from "./components/Authentication/authentication-guard";
import Profile from "./components/Authentication/Profile"
import './custom.css';

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
            <Route
                path="/Recipe"
                element=<AddRecipe />
            />
            <Route
                path="/Profile"
                element={<AuthenticationGuard component={Profile} />}
            />
            <Route
                path="/AddRecipe"
                element={<AuthenticationGuard component={AddRecipe} />}
            />
        </Routes>
      </Layout>
    );
  }
}
