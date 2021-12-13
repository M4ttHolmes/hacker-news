import {useEffect, useState} from "react";
import Navigation from "./Navigation";
import Results from "./Results";

const ApiFetch = () => {
    // State Variables
    const [story, setStory] = useState<Story>([])
    const [fetchType, setFetchType] = useState<string>("topstories")
    const [countIncrement, setCountIncrement] = useState<number>(30)
    const [count, setCount] = useState<number>(countIncrement)
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("")

    // Type Definitions
    type Story = StoryDetails[]

    type SearchDetails = {
        objectID: number
    }

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

    // Primary Fetch Function. Will build a new array of full article objects based on whatever is returned from the fetch. Sliced into smaller sections to improve load times.
    const fetchNewStories = () => {
        setSearchMode(false);
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

    // Function for switching between fetch types (top, new, ask, show, job, etc.)
    const updateFetchType = (fetch: string) => {
        console.log("Update Fetch Called");
        setFetchType(fetch);
        setCount(countIncrement);
        console.log(fetch);
    };

    // Search Function - Reaches out to 3rd party Algolia Indexer with search term and return count nested within the body.
    const searchFetch = () => {
        console.log("Search Fetch Called");
        setSearchMode(true)
        fetch(`https://uj5wyc0l7x-dsn.algolia.net/1/indexes/Item_production/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.0.2)%3B%20Browser%20(lite)&x-algolia-api-key=8ece23f8eb07cd25d40262a1764599b1&x-algolia-application-id=UJ5WYC0L7X`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(
                {
                    "query": search,
                    "analyticsTags": [
                      "web"
                    ],
                    "page": 0,
                    "hitsPerPage": count,
                    "minWordSizefor1Typo": 4,
                    "minWordSizefor2Typos": 8,
                    "advancedSyntax": true,
                    "ignorePlurals": false,
                    "clickAnalytics": true,
                    "minProximity": 8,
                    "numericFilters": [],
                    "tagFilters": [
                      "story",
                      []
                    ],
                    "typoTolerance": true,
                    "queryType": "prefixNone",
                    "restrictSearchableAttributes": [
                      "title",
                      "comment_text",
                      "url",
                      "story_text",
                      "author"
                    ],
                    "getRankingInfo": true
                  }       
            )
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.hits.length)
                let promises = data.hits.map((item: SearchDetails, key: number) => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${item.objectID}.json?print=pretty`)
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

    // Function to update the current number of articles displayed
    const updateCount = () => {
        setCount(count + countIncrement);
    };

    // Hook that will fire immediately on page load, as well as when the count or fetchType state is updated. 
    useEffect(() => {
        searchMode 
            ? searchFetch()
            : fetchNewStories()
    }, [count, fetchType])



    return(
        <div>
            <Navigation searchFetch={searchFetch} setSearch={setSearch} updateFetchType={updateFetchType}/>
            <Results updateCount={updateCount} story={story}/>
        </div>
    )
}


export default ApiFetch;