import "./MyRoutines.css";
import { useState, useEffect } from "react";
import { getToken, getUsername } from "../auth";
import AddRoutineForm from "./AddRoutineForm";
import UpdateRoutineForm from "./UpdateRoutineForm";
import AddActivityForm from "./AddActivityForm";
import UpdateActivityForm from "./UpdateActivityForm";
const BASE_URL = "https://still-plains-94282.herokuapp.com/api/";

const MyRoutines = ({ username, setUsername, authenticate }) => {
  const [ routines, setRoutines ] = useState([]);
  const [ routinesActive, setRoutinesActive ] = useState(true);
  const [ activitiesActive, setActivitiesActive ] = useState(false);
  const [ activities, setActivities ] = useState([]);
  const [ id, setId ] = useState('');

  const handleRoutinesActive = () => {
    setRoutinesActive(true);
    setActivitiesActive(false);
  };

  const handleActivitiesActive = () => {
    setRoutinesActive(false);
    setActivitiesActive(true);
  };

  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsername(result.username);
      })
      .catch(console.error);

    fetch(
      `${BASE_URL}users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
          console.log(result);
          setRoutines([...result]);
          console.log(result.id)
          setId(result.id);
      })
      .catch(console.error);

  }, []);

  const deleteRoutine = (id) => {
    fetch(`${BASE_URL}/routines/${id}`, {
      method: "DELETE",
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
    }).then(response => response.json())
      .then(result => {
        const newRoutines = routines.filter((routine) => {
           return (routine.id !== id)
        })
        setRoutines(newRoutines)
        console.log(result);
    })
      .catch(console.error);
    }

  const deleteActivity= (id) => {
    fetch(`https://still-plains-94282.herokuapp.com/api/routine_activities/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        const newActivities= routines.filter((routine) => {
          routine.activities.filter((activity) => {
            return (activity.id !== id)
          })
       })
       setRoutines(newActivities)
      })
      .catch(console.error);
    }

  const fitnessDay = new Date().toLocaleDateString();

  return (
    <>
      {getToken() && authenticate ? (
        <>
          <div className="main-my-routines">
            <div className="my-routines-container">
              <div className="my-routines-header">
                <div className="user-welcome">
                  <h1>
                    {username}'s Workout - {fitnessDay}
                  </h1>
                </div>
              </div>
              <div className="my-routines-right">
                <div className="nav">
                  <ul>
                    <li
                      onClick={handleRoutinesActive}
                      className={
                        routinesActive
                          ? "user-routines-active"
                          : "user-routines"
                      }
                    >
                      My Routines
                      {getToken() ? (
                      <AddRoutineForm
                        authenticate={ authenticate }
                        routines={ routines }
                        setRoutines={ setRoutines }
                      />
                    ) : null}
                    </li>
                    {/* <li
                      onClick={handleActivitiesActive}
                      className={
                        activitiesActive
                          ? "user-activities-active"
                          : "user-activities"
                      }
                    >
                      {" "}
                      My Activities
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="profile-body">
                <div
                  className={
                    routinesActive ? "post-routines-active" : "post-routines"
                  }
                >
                  <h1>Routines</h1>
                  {routines.map((routine, idx) => {
                    return <>
                      <div key={ idx }>{ routine.name }</div>
                      <div>{ routine.goal }</div>
                      { routine.activities ? <div> { routine.activities.map((activity, index) => {
                        return (<> <li key={ index }> { activity.name } </li>
                        <li key={ index }> { activity.description } </li>
                        <li key={ index }> Count: { activity.count } </li>
                        <li key={ index }> Duration: { activity.duration } </li> 
                        <button onClick={() => deleteActivity(activity.id)}>Delete Activity</button>
                        <UpdateActivityForm
                        routines={ routines }
                        setRoutines={ setRoutines }
                        routineActivityId={ activity.id }
                        />
                        <hr/>
                        </> )
                      })} </div> : null}
                      <button onClick={() => deleteRoutine(routine.id)}>Delete Routine</button>
                      {/* <button onClick={() => updateRoutine(routine.id)}>Update</button> */}
                      {<>
                        <UpdateRoutineForm
                          authenticate={ authenticate }
                          routines={ routines }
                          setRoutines={ setRoutines }
                          routineId={ routine.id }
                        />
                        <AddActivityForm
                          id={ id } 
                          // activities={activities}
                          // setActivities={setActivities}
                          routineId={ routine.id }
                          routines={ routines }
                          setRoutines={ setRoutines }
                        />
                        </>
                      }
                    </>;
                  })}
                  {}
                </div>
              </div>
              <div
                className={
                  activitiesActive
                    ? "post-activities-active"
                    : "post-activities"
                }
              >
                <h1>Activities</h1>
                <p>These are my activities</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="unauthenticatedProfile"> Login to access profile.</div>
      )}
    </>
  );
};

export default MyRoutines;
