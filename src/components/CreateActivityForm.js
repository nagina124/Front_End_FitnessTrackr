import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
Modal.setAppElement("#root");

const CreateActivityForm = ({activities, setActivities }) => {
    const [ name, setName ]= useState("")
    const [ description, setDescription ]= useState("")
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function addActivity(event) {
      event.preventDefault()
      fetch('https://still-plains-94282.herokuapp.com/api/activities', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
          name: name,
          description: description
      })
      }).then(response => response.json())
      .then(result => {
          if(result.error){
              alert("activity exists, please create a new unique one")
          }
          const activityCopy = [...activities]
          const newActivities = activityCopy.push(result)
          setActivities(newActivities)
          // console.log(result);

      })
      .catch(console.error);
  }

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        CREATE ACTIVITY
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
    <form onSubmit={addActivity}>
          <label>Activity Name</label>
          <input 
              type="text" 
              placeholder="Enter name of Activity"
              onChange={(event) => {setName(event.target.value)}}
          />
          <label>Activity Description</label>
          <input 
              type="text" 
              placeholder="Enter description"
              onChange={(event) => {setDescription(event.target.value)}}
          />
          <button type="submit">Create Activity</button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
    </form>
      </Modal>
    </div>
  );
};

export default CreateActivityForm;