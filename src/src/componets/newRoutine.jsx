import React, {useState} from "react";

const API_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

const NewRoutineForm = ({ token, getRoutinesByUser }) => {
    const [newRoutine, setNewRoutine] = useState({
        name: "",
        goal: "",
        isPublic: false
    });

     const handleSubmit = async (event) => {
       event.preventDefault();
       console.log(newRoutine, token)
       try {
         const response = await fetch(`${API_URL}routines`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             'Authorization': `Bearer ${token}`,
           },
           body: JSON.stringify(
             newRoutine
           ),
         });
         const result = await response.json();
         console.log(result);
         setNewRoutine({
               name: "",
               goal: "",
             });
             getRoutinesByUser();
       } catch (error) {
         console.error(error);
         alert("Routine creation failed, please try again");
       } 
     };
     //update fields as they are changed
     const handleChange = (event) => {
        setNewRoutine((prevRoutine) => ({
            ...prevRoutine,
            [event.target.id]: event.target.value
        }))
     }


    return (
      <form className="flex-col text-center" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="font-bold">
            Name:
          </label>
          <input
            id="name"
            className=" bg-beige-200 border-2 "
            required
            type="text"
            value={newRoutine.name}
            onChange={handleChange}
          ></input>
          <label htmlFor="goal" className="">
            Goal:
          </label>
          <input
            id="goal"
            className=" bg-beige-200 border-2 "
            required
            type="text"
            value={newRoutine.goal}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button
            type="submit"
            className="bg-beige-200 border-2 "
          >
            Create Routine
          </button>
        </div>
      </form>
    );
}

export default NewRoutineForm;