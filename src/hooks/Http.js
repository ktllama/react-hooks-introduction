import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
//passing url as argument for the api url this comp hook wil use
//passing dependencies which should be an array of the dependencies to determine when to run use effect
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    //using data as the state var here so the component is reusable- here we are fetching character info but we wont always be using it for that

    useEffect(() => {
        setIsLoading(true);
        console.log('sending http request')
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch.');
            }
            return response.json();
            })
            .then(data => {
            setIsLoading(false);
            setData(data);
            })
            .catch(err => {
            console.log(err);
            setIsLoading(false);
            });
    }, dependencies);
    
    //hooks can return data in many forms- string, number, object, array, or nothing-null
    return [isLoading, data];
};

//here we are creating a hook and adding logic to it
