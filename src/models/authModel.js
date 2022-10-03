/**
 * Model to authenticate user login or registration.
 */

const auth = {
    baseUrl: window.location.href.includes("localhost") ?
        'http://localhost:1337' :
        'https://jsramverk-editor-emab21.azurewebsites.net',
    login: async function login(user) {
        const response = await fetch(`${auth.baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    },
    register: async function register(user) {
        const response = await fetch(`${auth.baseUrl}/auth/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    }
};

export default auth;
