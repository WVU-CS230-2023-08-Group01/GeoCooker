import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeResourceById } from '../Services/message.service';

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams(); // Accessing the 'id' parameter from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipe data from your API endpoint
    const getData = async (id) => {

        const { data, error } = await getRecipeResourceById(id);
        return data;
    }

    let data = getData(id);
    const jsonD = () => {
        data.then((a) => {
            console.log(a)
            setRecipe(a);
            setLoading(false); // Update loading state after fetch completes
        });
    };
    jsonD();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (


        <div className="recipe">
        <h1 className="text-center">{recipe.recipeName}</h1>
        <h6 className="text-center">{recipe.location}</h6>
        {loading ? (
            <p>Loading...</p> // Show loading message or spinner
        ) : (
          <div className="container mt-4">
          <div className="row">
            <div className="col">
              <div className="d-flex">
                {recipe.tags.map((tag, index) => (
                  <div key={index} className="badge bg-secondary me-2">{tag.description}</div>
                ))}
              </div>
              <p className="text-muted">
                <span className="me-3">Prep Time: {recipe.cookTime}</span>
                <span className="me-3">Cook Time: {recipe.prepTime}</span>
                <span>Rating: {recipe.rating}</span>
              </p>
              <p>{recipe.description}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h2>Ingredients</h2>
              <ul className="list-group">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">{ingredient.description}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h2>Instructions</h2>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction.description}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        )}
        </div>
  );
};

export default Recipe;
