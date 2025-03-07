//@Reference https://stackoverflow.com/questions/67953641/reactjs-prevent-form-submission-not-working?
//@Reference https://stackoverflow.com/questions/66692085/better-way-of-handling-form-data-via-react-usestate?
//@Reference https://dev.to/vishnusatheesh/react-19-hooks-explained-everything-you-need-to-know-4il6?
//@Reference https://dev.to/nadim_ch0wdhury/develop-full-stack-event-management-system-45f9?
//@Reference https://medium.com/@titoadeoye/react-hooks-usestate-with-practical-examples-64abd6df6471
//@Reference https://mattburgess.medium.com/why-would-i-use-react-hook-form-8ae7b905953e
//@Reference https://heyjoshlee.medium.com/using-the-usestate-hook-and-working-with-forms-in-react-js-2139869549d0
//@Reference https://www.geeksforgeeks.org/how-to-handle-input-forms-with-usestate-hook-in-react/?
//@Reference https://getbootstrap.com/docs/4.1/components/forms/?
//@Reference https://getbootstrap.com/docs/5.0/forms/form-control/?
//Importing the necessary dependencies from react, such as useState
import React, { useState } from "react";
//Importing the API functions that are needed to handle the createEvent component
import { createEvent } from "../api";

const CreateEvent = ({ onEventCreated }) => {
  //State variables for form fields of the event details such as title, description, date/time and recurrence
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  //This is a function that handles the submission of the create event form
  const handleSubmit = (e) => {
    e.preventDefault();
    //This calls the backend API to create the event with the provided data
    createEvent({ title, description, date, recurrence }).then((res) => {
      //Thid passes the newly created event  back to the parent component
      onEventCreated(res.data);
      //This clears the form fields once an event has been created
      setTitle("");
      setDescription("");
      setDate("");
    });
  };

  return (
    <div className="container mt-4">
      {/* Form Header */}
      <h2 className="text-center mb-4">Create Event</h2>
      {/* Form for event creation */}
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="mb-3">
          {/* Event Title Input */}
          <label className="form-label" htmlFor="title">Event Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
        </div>
        {/* Event Description Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            required
          />
        </div>
        {/* Date and Time Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="date">Date and Time</label>
          <input
            id="date"
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {/* Recurrence Dropdown */}
        <div className="mb-3">
          <label className="form-label" htmlFor="recurrence">Recurrence</label>
          <select
            id="recurrence"
            className="form-select"
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
