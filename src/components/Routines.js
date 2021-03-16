import "./Routines.css"
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getToken, getUsername } from "../auth";

const Routines = ({ authenticate, username, setUsername }) => {
    const [ routines, setRoutines ] = useState([]);
    
    useEffect(() => {
        getUsername()
        .then((response) => response.json())
          .then((result) => {
              console.log(result)
            setUsername(result.username);
          })
          .catch(console.error);
      
          fetch('https://still-plains-94282.herokuapp.com/api/routines', {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .then(result => {
                console.log(result);
                // const publicRoutines = []
                // for(let i=0; i< result.length; i++){
                //     publicRoutines.push(result[i])
                // }
                // console.log(publicRoutines)
                // setRoutines(...publicRoutines)
                console.log(...result)
                setRoutines(result)
                console.log(routines)
            })
            .catch(console.error);
      }, []);

    return (
        <div>
            <h1> Routines </h1>
            {/* <section>
                {routines
                    .forEach((routine, index) => {
                        return (
                            <div key={ index }>
                                <h3> { routine.name } </h3>
                            </div>
                        )
                    })

                }
            </section> */}
        </div>
    )
}

export default Routines;