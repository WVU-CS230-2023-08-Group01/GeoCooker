import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { postRecipeResource, getTownData } from '../Services/message.service';


const RecipeForm = (Props) => {
    const [recipeData, setRecipeData] = useState({
        recipeName: '',
        description: '',
        instructions: [''],
        ingredients: ['']
    });
    const [message, setMessage] = useState("");
    const [manualTrigger, setManualTrigger] = useState(false);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (manualTrigger) {

            let isMounted = true;

            const getTown = async (town) => {
                const { data, error } = await getTownData(Props.latitude, Props.longitude);
                return data;
            }

            function offsetCoordinates(latitude, longitude) {
                // Offset distance in degrees (approximately 0.007 degrees is around half a mile)
                const offset = 0.007;

                // Generate random values for latitude and longitude offsets within the offset range
                const latOffset = Math.random() * offset - offset / 2;
                const longOffset = Math.random() * offset - offset / 2;

                // Apply offsets to the coordinates
                const newLatitude = latitude + latOffset;
                const newLongitude = longitude + longOffset;

                return { newLatitude, newLongitude };
            }

            const postData = async (town) => {
                const accessToken = await getAccessTokenSilently();

                //const jsonInstruction = recipeData.instructions.map((item, index) => {
                //    return {
                //        i: item
                //    };
                //});

                //const jsonIngredient = recipeData.ingredients.map((item, index) => {
                //    return {
                //        i: item
                //    };
                //});
                const { newLatitude, newLongitude } = offsetCoordinates(Props.latitude, Props.longitude);

                let json = {
                    "lat": newLatitude,
                    "lon": newLongitude,
                    "user": user.email,
                    "location": town,
                    "recipeName": recipeData.recipeName,
                    "description": recipeData.description,
                    "rating": 5,
                    "instructions": [
                        {
                            description:"s",
                        },
                        {
                            description:"s2"
                        }
                    ],
                    "ingredients": [],
                };
                //recipeData.instructions.forEach((instruction, index) => {
                //    json.instructions.push({ i: instruction });
                //});
                recipeData.ingredients.forEach((ingredient, index) => {
                    json.ingredients.push({ description: ingredient });
                });   
                console.log(json);
                if (isAuthenticated) {
                    const { data, error } = await postRecipeResource(accessToken, JSON.stringify(json));
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

            let data = getTown();
            const jsonD = () => {
                data.then((a) => {
                    console.log(a)
                    //this.setState({ town: a })
                    if (a.results.length > 0) {
                        const town = a.results[0].address_components.find(
                            (component) => component.types.includes('locality')
                        );
                        const state = a.results[0].address_components.find(
                            (component) => component.types.includes('administrative_area_level_1')
                        );
                        const townName = town ? town.long_name : 'Town not found';
                        const stateName = state ? state.short_name : 'State not found';
                        let id = townName + ", " + stateName;
                        postData(id);
                    }
                });
            };
            jsonD();


            return () => {
                isMounted = false;
                //setManualTrigger(false);
            };
        }
    }, [getAccessTokenSilently, manualTrigger, Props, isAuthenticated, recipeData, user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...recipeData.instructions];
        newInstructions[index] = value;
        setRecipeData({ ...recipeData, instructions: newInstructions });
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index] = value;
        setRecipeData({ ...recipeData, ingredients: newIngredients });
    };

    const addField = (fieldType) => {
        if (fieldType === 'instruction') {
            setRecipeData({ ...recipeData, instructions: [...recipeData.instructions, ''] });
        } else if (fieldType === 'ingredient') {
            setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, ''] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (page refresh)
        setManualTrigger(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="mb-3">
                    <label className="form-label">Recipe Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="recipeName"
                        value={recipeData.recipeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={recipeData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions:</label>
                    {recipeData.instructions.map((instruction, index) => (
                        <div key={`instruction-${index}`} className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => addField('instruction')}
                    >
                        Add Instruction
                    </button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients:</label>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={`ingredient-${index}`} className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => addField('ingredient')}
                    >
                        Add Ingredient
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
};

export default RecipeForm;
