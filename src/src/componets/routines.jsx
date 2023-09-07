import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const API_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

const Routines = () => {
  const [routines, setRoutines] = useState([])
  
  useEffect(() => {
    getPublicRoutines()
    console.log("Routines:", routines);
  }, [])

  const getPublicRoutines = async () => {
    try {
      const request = await fetch(`${API_URL}routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await request.json()
      // return result
      setRoutines(result)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div>
        {routines.length &&
        routines.map((routine) => {
          return (
            <div
              key={routine.id}
              className="bg-beige-200 rounded border-2"
            >
              <h3 className="text black">{routine.name}</h3>
              <h4>
                {routine.goal} - created by {routine.creatorName}
              </h4>
              <p className="text black">Your workout:</p>
              <div>
                {routine.activities.map((activity) => {
                  return (
                    <>
                      <p key={activity.id}>
                       - {activity.count}x {activity.name} <span>for {activity.duration} minutes</span>
                      </p>
                      <p className="">{activity.description}</p>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routines;