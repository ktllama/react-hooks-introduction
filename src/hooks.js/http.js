import { useState } from "react";

export const useHttp = (url) => {
//passing url as argument for the api url this comp hook wil use

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    //using data as the state var here so the component is reusable- here we are fetching character info but we wont always be using it for that

    fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch.');
        }
        return response.json();
        })
        .then(data => {
        //   const selectedCharacters = charData.results.slice(0, 5);
        //   setIsLoading(false);
        //   setCharacters(
        //     selectedCharacters.map((char, index) => ({
        //       name: char.name,
        //       id: index + 1
        //   })))
        setIsLoading(false);
        setData(data);
        })
        .catch(err => {
        console.log(err);
        setIsLoading(false);
        });
    //hooks can return data in many forms- string, number, object, array, or nothing-null
    return [isLoading, data];
};

//here we are creating a hook and adding logic to it
