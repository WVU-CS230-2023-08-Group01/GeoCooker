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

export const getAdminResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/admin`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};