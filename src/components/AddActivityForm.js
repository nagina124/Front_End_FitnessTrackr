import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
import Image2 from "../assets/svg-5.svg";
Modal.setAppElement("#root");

const AddActivityForm = ({ routineId, routines, setRoutines }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState();
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();

  useEffect(() => {
    fetch("https://still-plains-94282.herokuapp.com/api/activities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
      })
      .catch(console.error);
  }, []);

  function addActivityToRoutine(event) {
    event.preventDefault();
    fetch(
      `https://still-plains-94282.herokuapp.com/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setActivities([result])
      })
      .catch(console.error);
  }

  return (
    <div>
      <button className="my-routines-btn"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        ADD ACTIVITY (To Routine)
      </button>
      <Modal
        style={{
          overlay: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            width: "60%",
            margin: "auto auto",
            height: "500px",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            background: "rgb(201, 199, 255)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            border: "3px solid var(--darkerpurple)",
            borderRadius: "5px",
            outline: "none",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          },
        }}
        isOpen={modalIsOpen}
      >
      <div className="add-modal-content-left">
          <img src={Image2} alt="Fitness Stats" id="modal-img" />
        </div>
        <div className="modal-content-right">
        <form className="form" onSubmit={addActivityToRoutine}>
          <label>Add Activity To Routine</label>
          <select
          className="modal-input"
            onChange={(event) => {
              setActivityId(event.target.value);
            }}
          >
            <option> Select An Activity </option>
            {activities.map((activity, idx) => {
              return <option key={idx} value={activity.id}>{activity.name}</option>;
            })}
          </select>

          <label> Count: </label>
          <input
          className="modal-input"
            onChange={(event) => {
              setCount(Number(event.target.value));
            }}
          />
          <label> Duration: </label>
          <input
          className="modal-input"
            onChange={(event) => {
              setDuration(Number(event.target.value));
            }}
          />
          <button type="submit">Add Activity To Routine</button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddActivityForm;
