import {useEffect, useState} from "react";
import Navigation from "./Navigation";
import Results from "./Results";
import { Button } from "reactstrap";


const ApiFetch = () => {
    // STATE VARIABLES
    const [story, setStory] = useState<Story>([])
    const [fetchType, setFetchType] = useState<string>("topstories")
    const [countIncrement, setCountIncrement] = useState<number>(30)
    const [count, setCount] = useState<number>(countIncrement)

    // Function to update the current number of articles displayed
    const updateCount = () => {
        setCount(count + countIncrement)
    }

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
        setCount(countIncrement);
        console.log(fetch);
    };

    // Primary Fetch Function. Will build a new array of full article objects based on whatever is returned from the fetch.
    const fetchNewStories = () => {
        fetch(`https://hacker-news.firebaseio.com/v0/${fetchType}.json?print=pretty`)
            .then(res => res.json())
            .then(data => {
                let promises = data.slice(0, count).map((item: StoryDetails, key: number) => {
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
    }, [count, fetchType])

    return(
        <div>
            <Navigation updateFetchType={updateFetchType}/>
            <Results updateCount={updateCount} story={story}/>
            {/* <Button className="loadBtn" onClick={updateCount}>Load More</Button> */}
        </div>
    )
}


export default ApiFetch;