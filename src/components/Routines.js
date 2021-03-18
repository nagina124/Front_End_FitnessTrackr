import "./Routines.css";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getToken, getUsername } from "../auth";

const Routines = ({ authenticate, username, setUsername }) => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsername(result.username);
      })
      .catch(console.error);

    fetch("https://still-plains-94282.herokuapp.com/api/routines", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoutines([...result]);
        console.log(routines);
      })
      .catch(console.error);
  }, []);

  return (
    <>
        <div className="main-routines">
            <div className="main-routines-container">
                <h1>Stay Motivated, Connect with our Community of Friends, Workout Together</h1>
                <p>Custom made routines at your fingetips - Challenge yourself with a new routine:</p>
                <div className="main-routines-content">
                    {routines.map((routine, idx) => {
                        return <div className="routines-card" key={idx}>
                            <h2>{routine.creatorName}</h2>
                            <h3>Routine: {routine.name}</h3>
                            <h3>Goal: {routine.goal}</h3>
                        </div>;
                    })}
                </div>
            </div>
        </div>
    </>
  );
};

export default Routines;
