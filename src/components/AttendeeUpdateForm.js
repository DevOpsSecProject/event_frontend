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
//Importing the necessary dependencies from react, such as useEffect
import React, { useState } from "react";
//Importing the API functions that are needed to handle the updateAttendee component
import { updateAttendee } from "../api";

const AttendeeUpdateForm = ({ eventId, attendeeId, currentAttendeeData }) => {
  //Initialising the data state with attendee data currently already in the database
  const [name, setName] = useState(currentAttendeeData.name);
  const [email, setEmail] = useState(currentAttendeeData.email);
  const [rsvp, setRsvp] = useState(currentAttendeeData.rsvp);
  //This is a function that updates attendee details for the update form
  const handleUpdate = () => {
    const updatedAttendee = { name, email, rsvp };
    updateAttendee(attendeeId, updatedAttendee)
      .then((res) => {
        console.log("Attendee updated:", res.data);
      })
      .catch((err) => {
        console.error("Error updating attendee:", err);
      });
  };

  return (
    <div className="container mt-4">
      {/* This is the Title for the update form */}
      <h3 className="text-center mb-4">Update Attendee</h3>
      {/* This is the Input field for attendee name */}
      <div className="mb-3">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Attendee Name"
        />
      </div>
      <div className="mb-3">
        {/* This is the Input field for attendee email */}
        <label className="form-label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Attendee Email"
        />
      </div>
      {/* This is the Checkbox to update RSVP status */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="rsvp"
          checked={rsvp}
          onChange={(e) => setRsvp(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="rsvp">RSVP</label>
      </div>
      {/* This is the Button to trigger update action */}
      <button onClick={handleUpdate} className="btn btn-primary w-100">
        Update Attendee
      </button>
    </div>
  );
};

export default AttendeeUpdateForm;
