import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
import Recipe from './Recipe.js';
import { totalRecipes } from './Utils.js'

const API_URL = `https://api.edamam.com/search?q=pumpkin&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`;

export default class App extends Component {
  state = {
    recipes: [],
    loading: false
  }

  componentDidMount = async () => {
    await this.fetchRecipes()
  }

  fetchRecipes = async () => {
    this.setState({ loading: true })

    const response = await request.get(API_URL);

    this.setState({
      recipes: response.body.hits,
      loading: false
    })
  }
  
  render() {
    return (
      <div className='top-level'>

        <h2>
          Pumpkin Recipes: {totalRecipes(this.state.recipes)}
        </h2>

        <div className='recipe-box'>
        {
          this.state.loading
          ? <div className='spinner'>
              <img src='https://media3.giphy.com/media/QmMmDY5F0FOn4KMaFo/giphy.gif?cid=5a9984cc5zio1cnbg1jpuz0s1xyebwvta3n0d8ymo8sdyani&rid=giphy.gif' alt='Pumpkin saying Boo!' />
            </div>
          : this.state.recipes.map((rec, id) => 
            <div
              key={id}
              className='recipe-item'>
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
