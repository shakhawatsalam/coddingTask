import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername } from '../helper/helper.js'

// Make api request

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// custom hook is ready 
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });


    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));

                const { username } = !query ? await getUsername() : '';


                const { data, status } = !query ? await axios.get(`https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/user/${username}`) :
                    await axios.get(`https://helloworld-1kh92869a-shakhawatsalam.vercel.app/api/${query}`);

                if (status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };
        fetchData();
    }, [query]);
    return [getData, setData];

}