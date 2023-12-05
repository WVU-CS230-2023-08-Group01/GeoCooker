// AddRecipeForm.js

import React, { Component } from 'react';
import { PostData } from './PostData';
import { NavLink } from 'react-router-dom';

var coords = [];

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    coords[0] = crd.latitude;
    coords[1] = crd.longitude;
}

function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


class AddRecipeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            recipeName: '',
            origin: '',
            ingredients: [''], // Start with one empty ingredient
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', this.state);
        // Add logic to handle form submission, e.g., send data to a server
    };

    handleInputChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...this.state.ingredients];
        ingredients[index] = value;
        this.setState({
            ingredients,
        });
    };

    handleAddIngredient = () => {
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, ''], // Add an empty ingredient to the list
        }));
    };

    handleDeleteIngredient = (index) => {
        this.setState((prevState) => ({
            ingredients: prevState.ingredients.filter((_, i) => i !== index),
        }));
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    render() {
        return (
            <div>
                <h2>Add Recipe</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User Name:
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                    </label>
                    <br />
                    <label>
                        Recipe Name:
                        <input
                            type="text"
                            value={this.state.recipeName}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                    </label>
                    <br />
                    <label>
                        Origin:
                        <input
                            type="text"
                            value={this.state.origin}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                    </label>
                    <br />
                    <label>
                        Ingredients:
                        <ul className="ingredient-list">
                            {this.state.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <input
                                        type="text"
                                        value={ingredient}
                                        onChange={(e) => this.handleInputChange(e, index)}
                                    />
                                    {index > 0 && ( // Render delete button (X) from the second row onward
                                        <button
                                            type="button"
                                            onClick={() => this.handleDeleteIngredient(index)}
                                            className="delete-ingredient-button"
                                        >
                                            X
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={this.handleAddIngredient} className="add-ingredient-button">
                            Add Ingredient
                        </button>
                    </label>
                    <br />
                    <NavLink to="/conf" state={{
                        recipeName: this.state.recipeName,
                        lat: coords[0],
                        lon: coords[1],
                        ingredients: this.state.ingredients,
                        instructions: null,
                        location: this.state.origin,
                    }}>
                        <button type="submit">Submit</button>
                    </NavLink>
                </form>
            </div>
        );
    }
}

export default AddRecipeForm;
