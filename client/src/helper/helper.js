import axios from 'axios';
import jsw_decode from 'jwt-decode';

// Make api request

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN


//To get username from Token
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jsw_decode(token);

    return decode;
}





//authencate function
export async function authencate(username) {
    try {
        return await axios.post('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/authenticate', { username });
    } catch (error) {
        return { error: "Username dose't exist.." }

    }
};


// get user details
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" }
    }
};


//register user function
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/register`, credentials);

        let { username, email } = credentials;

        //send email
        if (status === 201) {
            await axios.post('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/registerMail', { username, userEmail: email, text: msg })
        };

        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({ error });
    }
};


// login function

export async function verifyPassword({ username, password }) {
    try {
        const { data } = await axios.post(`https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/login`, { username, password });
        return { data };
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match" });
    }
};


//update user function

export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" });
    }
};


//genetate OTP 
export async function genarateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/generateOTP', { params: { username } });


        // send mail with OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code} Verify and recover your password`;
            await axios.post('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
};



//Verify OTP
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/verifyOTP', { params: { username, code } });
        return { data, status }
    } catch (error) {
        return Promise.reject(error);

    }
};



//Reset Password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });

    } catch (error) {
        return Promise.reject({ error });
    }
}