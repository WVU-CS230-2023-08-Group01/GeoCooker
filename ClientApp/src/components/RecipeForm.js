import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { postRecipeResource, getTownData } from '../Services/message.service';
import { useNavigate } from 'react-router-dom';


const RecipeForm = (Props) => {
    const [recipeData, setRecipeData] = useState({
        recipeName: '',
        description: '',
        instructions: [''],
        ingredients: [''],
        tags: [''],
        prepTime: 0,
        cookTime: 0,
    });
    const [errors, setErrors] = useState({
        recipeName: '',
        description: '',
        instructions: [],
        ingredients: [],
        time: '',
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [manualTrigger, setManualTrigger] = useState(false);
    const [dataPosted, setDataPosted] = useState(false);
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

                const { newLatitude, newLongitude } = offsetCoordinates(Props.latitude, Props.longitude);

                let json = {
                    "lat": newLatitude,
                    "lon": newLongitude,
                    "user": user.email,
                    "location": town,
                    "recipeName": recipeData.recipeName,
                    "description": recipeData.description,
                    "rating": 5,
                    "instructions": [],
                    "ingredients": [],
                    "tags": [],
                    "cookTime": recipeData.cookTime,
                    "prepTime": recipeData.prepTime,
                };
                recipeData.instructions.forEach((instruction, index) => {
                   json.instructions.push({ description: index+1 + ". " + instruction });
                });
                recipeData.ingredients.forEach((ingredient, index) => {
                    json.ingredients.push({ description: index+1 + ". " + ingredient });
                });   
                recipeData.tags.forEach((tag, index) => {
                    json.tags.push({ description: tag });
                });   
                console.log(json);
                if (isAuthenticated) {
                    const { data, error } = await postRecipeResource(accessToken, JSON.stringify(json));
                    if (!isMounted) {
                        return;
                    }

                    if (data) {
                        setMessage(JSON.stringify(data, null, 2));
                        navigate("/recipe-details/" + data.recipeId)
                    }

                    if (error) {
                        setMessage(JSON.stringify(error, null, 2));
                        navigate("/error")
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

    const validateRecipe = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        // Validate Recipe Name
        if (!recipeData.recipeName.trim()) {
            errorsCopy.recipeName = 'Recipe Name is required';
            isValid = false;
        } else {
            errorsCopy.recipeName = '';
        }

        // Validate Description
        if (recipeData.description.length > 250 || recipeData.description.length == 0) {
            errorsCopy.description = 'Description should not exceed 250 characters and should not be empty';
            isValid = false;
        } else {
            errorsCopy.description = '';
        }

        // Validate Instructions
        recipeData.instructions.forEach((instruction, index) => {
            if (!instruction.trim()) {
                errorsCopy.instructions[index] = 'Instruction should not be empty';
                isValid = false;
            } else {
                errorsCopy.instructions[index] = '';
            }
        });

        // Validate Ingredients
        recipeData.ingredients.forEach((ingredient, index) => {
            if (!ingredient.trim()) {
                errorsCopy.ingredients[index] = 'Ingredient should not be empty';
                isValid = false;
            } else {
                errorsCopy.ingredients[index] = '';
            }

         // Validate cook time and prep time
        if (recipeData.cookTime == 0 || recipeData.prepTime == 0 || isNaN(recipeData.cookTime) || isNaN(recipeData.prepTime)) {
            errorsCopy.time = 'Times should not be 0 or have Letters';
            isValid = false;
        } else {
            errorsCopy.recipeName = '';
        }

        });

        setErrors(errorsCopy);
        return isValid;
    };

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

    const removeField = (fieldType) => {
        if (fieldType === 'instruction') {
            const newInstructions = [...recipeData.instructions];
            newInstructions.pop();
            setRecipeData({ ...recipeData, instructions: newInstructions });
        } else if (fieldType === 'ingredient') {
            const newIngredients = [...recipeData.ingredients];
            newIngredients.pop();
            setRecipeData({ ...recipeData, ingredients: newIngredients });
        }
    };

    const handleSubmit = (e) => {
        const isValid = validateRecipe();

        if (isValid) {
            setManualTrigger(true);
            e.preventDefault(); // Prevents the default form submission behavior (page refresh)
        }else{
            e.preventDefault(); // Prevents the default form submission behavior (page refresh)
        }
    };


    const handleTagChange = (index, value) => {
        const newTags = [...recipeData.tags];
        newTags[index] = value;
        setRecipeData({ ...recipeData, tags: newTags });
    };

    const addTagField = () => {
        setRecipeData({ ...recipeData, tags: [...recipeData.tags, ''] });
    };

    
    return (

        <form onSubmit={handleSubmit}>
            <div className="container" >
                <div className="mb-3">
                    <label className="form-label">Recipe Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="recipeName"
                        value={recipeData.recipeName}
                        onChange={handleInputChange}
                    />
                    {errors.recipeName && <div className="text-danger">{errors.recipeName}</div>}

                </div>
                <div className="mb-3">
                    <label className="form-label">PrepTime min:</label>
                    <input
                        className="form-control"
                        name="prepTime"
                        value={recipeData.prepTime}
                        onChange={handleInputChange}
                    />
                <label className="form-label">CookTime min:</label>
                    <input
                        className="form-control"
                        name="cookTime"
                        value={recipeData.cookTime}
                        onChange={handleInputChange}
                    />
                {errors.description && <div className="text-danger">{errors.time}</div>}

                </div>
                
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={recipeData.description}
                        onChange={handleInputChange}
                        maxLength={250}
                    />
                {errors.description && <div className="text-danger">{errors.description}</div>}

                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients:</label>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={`ingredient-${index}`} className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px', textAlign: 'right', marginRight: '10px' }}>{index + 1}.</div>

                        <input
                                type="text"
                                className="form-control"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                            {errors.ingredients[index] && <div className="text-danger">{errors.ingredients[index]}</div>}
                           
                        </div>

                    ))}
                     <div style={{ display: 'flex' }}>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => addField('ingredient')}
                        >
                            Add Ingredient
                        </button>
                        <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeField('ingredient')}
                                style={{ margin: '10px',}}
                                disabled={recipeData.ingredients.length === 1}
                            >
                                Remove Last Ingredient
                            </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions:</label>
                    {recipeData.instructions.map((instruction, index) => (
                        <div key={`instruction-${index}`} className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '30px', textAlign: 'right', marginRight: '10px' }}>{index + 1}.</div>
                            <input
                                type="text"
                                className="form-control"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                            />
                           {errors.instructions[index] && <div className="text-danger">{errors.instructions[index]}</div>}
                        </div>
                    ))}
                    <div style={{ display: 'flex' }}>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => addField('instruction')}
                        >
                            Add Instruction
                        </button>
                        <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeField('instruction')}
                                style={{ margin: '10px',}}
                                disabled={recipeData.instructions.length === 1}
                            >
                                Remove Last Instruction
                            </button>
                    </div>
                </div>
                
                <div className="mb-3">
                <label className="form-label">Tags:</label>
                {recipeData.tags.map((tag, index) => (
                    <div key={`tag-${index}`} className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addTagField}
                >
                    Add Tag
                </button>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            
        </form>
    );
};

export default RecipeForm;
