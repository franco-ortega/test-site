import React, { Component } from 'react';
import './App.css';
import Recipe from './Recipe.js';
import request from 'superagent';
//import { BrowserRouter as Router, Link } from "react-router-dom"
import { totalRecipes } from './Utils.js'

const API_URL = `https://api.edamam.com/search?q=pumpkin&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`;

export default class App extends Component {
  state = {
    recipes: []
  }

  componentDidMount = async () => {
    await this.fetchRecipes()
  }


  fetchRecipes = async () => {
    const response = await request.get(API_URL);
    this.setState({ recipes: response.body.hits })
  }
  
  render() {
    return (
      <div className='top-level'>
        
        <h2>
          Pumpkin Recipes: {totalRecipes(this.state.recipes)}
        </h2>
        
        <div className='recipe-box'>
        {
          this.state.recipes.map((rec, id) => 
            <div
              key={id}
              className='recipe-item'>
                {/* <div className='test-box'>test box</div> */}
              <Recipe
                key={id}
                title={rec.recipe.label}
                labels={rec.recipe.healthLabels.map(((label, id) => <div key={id}>{label}</div>))}
                image={rec.recipe.image}
                url={rec.recipe.url}
                calories={Math.floor(rec.recipe.calories)}
              />
            </div>
          )
        }
        </div>
      </div>
    )
  }
}
