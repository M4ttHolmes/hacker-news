import React, {useEffect, useState} from "react";
import Navigation from "./Navigation";
import Results from "./Results";


const ApiFetch = () => {
    const [story, setStory] = useState<Story>([])
    const [fetchType, setFetchType] = useState<string>("topstories")

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


    const updateFetchType = (fetch: string) => {
        console.log("Update Fetch Called");
        setFetchType(fetch);
        console.log(fetch);
        fetchNewStories();
    };


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
                    console.log(json);
                    setStory(json);

                });
                
                
            });
    }

    useEffect(() => {
        fetchNewStories();
    }, [])

    return(
        <div>
            <Navigation updateFetchType={updateFetchType}/>
            <Results story={story}/>
        </div>
    )
}


export default ApiFetch;