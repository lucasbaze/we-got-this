import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        console.log('Sending Http Request');
        axios
            .get(url)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch.');
                }
                setIsLoading(false);
                setFetchedData(res.data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [dependencies, url]);

    return [isLoading, fetchedData];
};
