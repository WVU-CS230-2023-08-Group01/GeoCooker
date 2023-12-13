// RecipeCard.js
import React, { useState, useEffect } from 'react';
import { deleteRecipe } from '../Services/message.service';
import { useAuth0 } from "@auth0/auth0-react";

const RecipeCard = ({ recipe }) => {

    const [message, setMessage] = useState("");
    const [manualTrigger, setManualTrigger] = useState(false);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    


    const handleDelete = () => {
        // Invoke the onDelete function with the recipe ID or any other identifier
         // Assuming recipe.id is the unique identifier
        setManualTrigger(true);
    };

    useEffect(() => {
        if (manualTrigger) {

            let isMounted = true;


            const postData = async () => {
                const accessToken = await getAccessTokenSilently();
         
                if (isAuthenticated) {
                    const { data, error } = await deleteRecipe(accessToken, recipe.id);
                    if (!isMounted) {
                        return;
                    }

                    if (data) {
                        setMessage(JSON.stringify(data, null, 2));
                    }

                    if (error) {
                        setMessage(JSON.stringify(error, null, 2));
                    }
                }

            };

         
            postData().then(() => {
                // Reload the page after postData() finishes
                window.location.reload();
            });
            return () => {
                isMounted = false;
                setManualTrigger(false);
            };
        }
    }, [getAccessTokenSilently, manualTrigger, isAuthenticated, user]);

    return (
        <div className="card">
            {/*<img src={recipe.image} className="card-img-top" alt={recipe.title} />*/}
            <div className="card-body">
                <h5 className="card-title">{recipe.recipeName}</h5>
                <p className="card-text">{recipe.description}</p>

                <p className="card-text">{recipe.location}</p>
                {/* Additional details or actions for the recipe */}

                {/* Add a delete button */}
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
