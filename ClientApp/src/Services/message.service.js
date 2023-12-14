import { callExternalApi } from "./external-api.services";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getRecipeResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/Recipe`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },

    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getRecipeResourceById = async (id) => {
    const config = {
        url: `${apiServerUrl}/api/Recipe/${id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },

    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const postRecipeResource = async (accessToken, json) => {
    const config = {
        url: `${apiServerUrl}/api/Recipe`,
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
        },
        data: json,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const deleteRecipe = async (accessToken, id) => {
    const config = {
        url: `${apiServerUrl}/api/Recipe/${id}`,
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getTownData = async (latitude, longitude) => {
    let API_KEY = "AIzaSyDfWvBqyov4n20fceBDlWg4lDN74-oInqc";
    const config = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
        method: "GET",
        headers: null,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};