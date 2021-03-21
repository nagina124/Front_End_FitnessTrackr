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
        setRoutines(result);
      })
      .catch(console.error);
  }, []);

  return (
    <>
        <div className="main-routines">
            <div className="main-routines-container">
                <h1>Stay Motivated, Connect with our Community of Friends, Workout Together</h1>
                <p>Custom made routines at your fingertips - Challenge yourself with a new routine:</p>
                <div className="main-routines-content">
                    {routines.map((routine, idx) => {
                        return <div className="routines-card" key={idx}>
                            <h2>{routine.creatorName}</h2>
                            <h3>Routine: {routine.name}</h3>
                            <h3>Goal: {routine.goal}</h3>
                            <div className="main-routine-activities">
                              <div className="routine-activities"> { routine.activities.map((activity, index) => {
                                      return (
                                        <>
                                          <h5 key={index}> {index + 1}. Activity : { activity.name } </h5>
                                          <h6 key={index}> Description : { activity.description } </h6>
                                          <h6 key={index}> Duration (minutes) : { activity.duration } </h6>
                                          <h6 key={index}> Count (reps) : { activity.count } </h6>
                                        </>)
                                    })} 
                              </div>
                            </div>
                        </div>;
                    })}
                </div>
            </div>
        </div>
    </>
  );
};

export default Routines;
