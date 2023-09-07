import React,{useState} from 'react'
import { createActivity,updateActivity } from '../api';
import { useNavigate } from 'react-router-dom';

const CreateActivity = () => {

const [name ,setName] = useState("");
const [description, setDescription] = useState("");
const [message, setMessage] = useState("");
const navigate = useNavigate();


const handleName = (e) =>{
    setName(e.target.value);
};

const handleDescription = (e) =>{
    setDescription(e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const handleCreateActivity = async () => {
    try {
      const response = await createActivity(name, description);
      if (response.error) {
        alert("This activity has already been made");
      } else {
        setMessage(`Activity ${response.name} was added`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleCreateActivity(name, description);
  setName("");
  setDescription("");
  navigate("/activities");
};



    
return (
  <section className="App h-screen w-full flex justify-center items-center ">
    <div className="w-full max-w-md bg-beige-500">
      <form
        className=" bg-grey"
        onSubmit={handleSubmit}
      >
        <div className="px-4 pb-4">
          <label
            htmlFor="activity"
            className="text-sm text-black-400 block pb-2"
          >
            Activity Creator
          </label>
          <input
            type="text"
            id="creator"
            value={name}
            onChange={handleName}
            className="border rounded w-full py-2 px-3 text-black-600 "
            placeholder="create activity"
          />
        </div>
        <div className="px-4 pb-4">
          <label
            htmlFor="describe activity"
            className="text-sm text-black-100 block pb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            value={description}
              onChange={handleDescription}
            className="text-black-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Describe Activity"
          />
        </div>
        <div>
          <button
            className=" bg-beige-400 text-black focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
);
}

export default CreateActivity