import {useEffect, useState} from "react";
import Navigation from "./Navigation";
import Results from "./Results";


const ApiFetch = () => {
    // STATE VARIABLES
    const [story, setStory] = useState<Story>([])
    const [fetchType, setFetchType] = useState<string>("topstories")

    // TYPE DEFINITIONS    
    type Story = StoryDetails[]

    type StoryDetails = {
        by: string,
        descendants: number,
        id: number,
        score: number,
        time: number,
        title: string,
        type: string,
        url: string
    }

    // Function for switching between fetch types (top, new, ask, show, job, etc.)
    const updateFetchType = (fetch: string) => {
        console.log("Update Fetch Called");
        setFetchType(fetch);
        console.log(fetch);
    };

    // Primary Fetch Function. Will build a new array of full article objects based on whatever is returned from the fetch.
    const fetchNewStories = () => {
        fetch(`https://hacker-news.firebaseio.com/v0/${fetchType}.json?print=pretty`)
            .then(res => res.json())
            .then(data => {
                let promises = data.map((item: StoryDetails, key: number) => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                    .then(
                        result => result.json(), 
                        error => console.log(error)
                    );
                });
            
                Promise.all(promises)
                .then(json => {
                    setStory(json);
                });   
            });
    }

    // Hook that will fire immediately on page load, as well as when the fetchType state is updated (when switched between using the updateFetchType function)
    useEffect(() => {
        fetchNewStories();
    }, [fetchType])

    return(
        <div>
            <Navigation updateFetchType={updateFetchType}/>
            <Results story={story}/>
        </div>
    )
}


export default ApiFetch;