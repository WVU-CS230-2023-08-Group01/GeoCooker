import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Assuming a RecipeCard component exists
import { useAuth0 } from "@auth0/auth0-react";
import { getRecipeResource } from '../Services/message.service';

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [loading, setLoading] = useState(true);

    function linearSearchForUserName(array, userName) {
        let data = [];
        let x = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].user === userName) {
                 // UserName found in the array
                data[x] = array[i];
                x = x + 1;
            }
        }
        return data; // UserName not found in the array
    }

    useEffect(() => {
        // Fetch user's saved recipes from an API using the userId
        // Example API call using fetch or axios
        // Replace 'apiEndpoint' with your actual API endpoint
        const getData = async (town) => {

            const { data, error } = await getRecipeResource();
            return data;
        }

        let data = getData();
        const jsonD = () => {
            let userId = user.email;
            let recipeData = [];
            data.then((a) => {
                console.log(a)
                recipeData = linearSearchForUserName(a, userId);
                console.log(recipeData);
                setSavedRecipes(recipeData);
                setLoading(false); // Update loading state after fetch completes
            });
        };
        jsonD();
        
    }, []);

    return (
        <div className="saved-recipes">
            <h2 className="text-center">Created Recipes</h2>
            {loading ? (
                <p>Loading...</p> // Show loading message or spinner
            ) : (
                <div className="row">
                    {savedRecipes.length > 0 && savedRecipes.map((recipe, index) => (
                        <div key={index} className="col-md-6">
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedRecipes;