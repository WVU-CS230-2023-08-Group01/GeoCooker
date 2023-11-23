import React, { Component } from 'react';
import './Recipe.css';
import myRecipes from './Map/myRecipes'; 

export class Recipe extends Component {
  static displayName = Recipe.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {

      // Assuming you have the recipeId as a prop
      const { recipeId } = this.props;
    
      // Log the recipeId to check if it's being passed correctly
      console.log('recipeId:', recipeId);
    
      // Find the recipe with the given ID in the imported JSON data
      const recipe = myRecipes.find(recipe => recipe.id === recipeId);
      
      // Log the recipe to check if it's being found
      console.log('recipe:', recipe);
    
      if (!recipe) {
        // Log a message if the recipe is not found
        console.log('Recipe not found');
        return <div>Recipe not found</div>;
      }
    
      // Destructure recipe details
      const {
        title,
        author,
        source,
        description,
        ingredients,
        steps,
        rating,
      } = recipe;

    return (
      <div className="recipe">
        <button className="save-button">Save Recipe</button>
        <h1 className="recipe-title"><strong>{title}</strong></h1>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Source:</strong> {source}</p>
        <p><strong>Description:</strong> {description}</p><br /><br /><br />

        <div className="recipe-table">
          <div className="recipe-row">
            <div className="recipe-cell">
              <h3 className="section-title">Ingredients:</h3>
              <ul className="ingredient-list">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-cell">
              <h3 className="section-title">Steps:</h3>
              <ol className="step-list">
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <br /><br /><br /><p className="rating"><strong>Rating:</strong> {rating}</p>
      </div>
    );
  }
}