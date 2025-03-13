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
//This imports the function that sends the updateEvent data to the backend from the frontend of the application
import { updateEvent } from "../api";

const UpdateEvent = ({ event, onEventUpdated }) => {
  //State variables for form fields of the updated event details such as title, description, date/time and recurrence
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [recurrence, setRecurrence] = useState(event.recurrence);
  const [location, setLocation] = useState(event.location || "");
  //This is a function that handles the submission of the updated create event form
  const handleSubmit = (e) => {
    e.preventDefault();
    //API call to update the event
    updateEvent(event.id, { title, description, date,location }).then((res) => {
      //passes the updated event data to the parent component
      onEventUpdated(res.data);
    });
  };

  return (
    <div className="container mt-4">
      {/* Form Heading */}
      <h2 className="text-center mb-4">Update Event</h2>
      {/* Form for updating an event */}
      <form onSubmit={handleSubmit} className="form-container">
        {/* Event Title Input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        {/* Event Description Input */}
        <div className="mb-3">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <div className="mb-3">
          <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
        </div>
        {/* Event Date and Time Input */}
        <div className="mb-3">
          <input
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {/* Recurrence Selection Dropdown */}
        <div className="mb-3">
          <select
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
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};
// Export the component for use in other parts of the application
export default UpdateEvent;
