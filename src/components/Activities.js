import "./Activities.css"
import { useState, useEffect } from "react";
import { getToken } from "../auth";
import CreateActivityForm from "./CreateActivityForm";

const Activities = () => {
    const [ activities, setActivities ] = useState([]);
    useEffect(() => {    
    fetch('https://still-plains-94282.herokuapp.com/api/activities', {
        headers: {
            'Content-Type': 'application/json',
        },
        }).then(response => response.json())
        .then(result => {
        setActivities(result)
        })
        .catch(console.error);
    }, []);

    return (
        <div>
            <h1> Activities </h1>
            <h3> { activities.map((activity, index) => {
                return (<section>
                        <ul key={ index }>
                            <li> { activity.name } : { activity.description } </li>
                        </ul>
                        </section>)
            }) } </h3>
            {getToken() ? 
            <>
            {/* <button onClick={addActivity}> Add Activity </button>  */}
            <CreateActivityForm activities={ activities } setActivities= { setActivities }/>
            
            </>
            : null}
        </div>
    )
}

export default Activities;