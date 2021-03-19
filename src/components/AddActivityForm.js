import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const AddActivityForm = ({routineId, routines, setRoutines }) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ activities, setActivities ] = useState([])
    const [ activityId, setActivityId ]= useState()
    const [ count, setCount ] = useState()
    const [ duration, setDuration ] = useState()
  
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

    function addActivityToRoutine(event) {
      event.preventDefault()
      fetch(`https://still-plains-94282.herokuapp.com/api/routines/${routineId}/activities`, {
        method: "POST",
        body: JSON.stringify({
          activityId: activityId,
          count: count, 
          duration: duration
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
        //   setRoutines(result)
        })
        .catch(console.error);
  }

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}>
        ADD ACTIVITY (To Routine)
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 300,
            left: 300,
            right: 300,
            bottom: 600,
            backgroundColor: "light purple"
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
    <form onSubmit={addActivityToRoutine}>
          <label>Add Activity To Routine</label>
          <select
                onChange={(event) => {
                    setActivityId(event.target.value)
                }}
                
            ><option> Select An Activity </option>
            { activities.map((activity) => {return <option value={ activity.id }>     
                                                        { activity.name }
                                                    </option>})}
          </select>

          <label> Count: </label>
          <input onChange={(event) => {
              setCount(Number(event.target.value))
          }}/>
          <label> Duration: </label>
          <input onChange={(event) => {
              setDuration(Number(event.target.value))
          }}/>
          <button type="submit">Add Activity To Routine</button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}>
            Close
          </button>
    </form>
      </Modal>
    </div>
  );
};

export default AddActivityForm;