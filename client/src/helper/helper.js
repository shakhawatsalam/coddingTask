import axios from 'axios';


// Make api request





//authencate function
export async function authencate(username) {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (error) {
        return { error: "Username dose't exist.." }

    }
};


// get user details
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" }
    }
};


//register user function
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        //send email
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        };

        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({ error });
    }
}