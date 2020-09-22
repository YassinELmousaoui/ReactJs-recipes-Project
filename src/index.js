import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Recipes from './ui/recipes';
import Ingredients from './ui/ingredients';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

ReactDOM.render(
  <BrowserRouter>
    <div className="myHeader">
      RECIPES EVER-DAY
    </div>
    <Switch>
    <Route path="/ingredients/:id" component={Ingredients}/>
    <Route path="/">
      <Recipes/>
    </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


