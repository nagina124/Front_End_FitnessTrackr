import "./MyRoutines.css";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getToken, getUsername } from "../auth";

const MyRoutines = ({ username, setUsername, authenticate }) => {
    const [ routines, setRoutines ] = useState([]);
    const [ activities, setActivities ] = useState([]);
  
    useEffect(() => {
      getUsername()
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
          setUsername(result.username);
          setRoutines(result.routines);
          setActivities(result.activities);
        })
        .catch(console.error);
    }, []);
  
    function getUserInfo() {
        fetch('https://still-plains-94282.herokuapp.com/api/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ getToken () }`
            },
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
    }

    console.log(getUserInfo())

    return (
        <div>
            { getToken() && authenticate ? (
                <>
                    <h1 className="username"> Welcome { username } </h1>
                </>
        
            ) : (
            <div className="unauthenticatedProfile"> Login to access profile.</div>
            )}
        </div>
    );

}

export default MyRoutines;

            
