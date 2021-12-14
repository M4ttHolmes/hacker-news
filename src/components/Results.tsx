import React from "react";
import {Card, CardTitle, CardBody, CardSubtitle, Button} from 'reactstrap'


// Props passed in from the ApiFetch component.
type ResultProps = {
    story: StoryDetails[]
    updateCount: () => void
}

// Type Definitions
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

const Results = (props: ResultProps) => {
    // Main Display - Map will iterate through each story and display its object properties on the page. 
    return(
        <div>
            {props.story.map((item: StoryDetails, key: number) => {
                const date = new Date(item.time*1000)
                return(
                    <Card>
                        <CardBody>
                            <CardTitle>{key + 1} - <a href={item.url} className="article-link" target="_blank" rel="noreferrer">{item.title}</a></CardTitle>
                            <CardSubtitle className="text-muted">
                                <span>{item.score} points </span>
                                <span>by </span>
                                <span className="fauxLink">{item.by} </span>
                                <span>on {date.toLocaleDateString("en-US")} | </span> 
                                <span className="fauxLink">{item.descendants} comments </span>
                            </CardSubtitle>
                        </CardBody>
                    </Card>     
                )
            })}
            <Button id="btn-load" onClick={props.updateCount}>Load More</Button>
        </div>
    )
}

export default Results