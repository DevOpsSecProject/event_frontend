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
//Importing the necessary dependencies from react, such as useEffect and useState
import React, { useEffect, useState } from "react";
//Importing the API functions that are needed to handle the attendees component
import { getAttendees, removeAttendee, updateAttendee } from "../api";

const AttendeeList = ({ eventId }) => {
  //State to store the list of all attendees of an event
  const [attendees, setAttendees] = useState([]);
  //State to track which attendee is being edited in the update attendee form
  const [editingAttendee, setEditingAttendee] = useState(null);
  //State to store updated data for an attendee such as their name and email
  const [updatedData, setUpdatedData] = useState({ name: "", email: "" });
  //Fetch attendees of an event whenever the eventId changes
  useEffect(() => {
    getAttendees(eventId).then((res) => setAttendees(res.data));
  }, [eventId]);
  //This ia a function to remove an attendee from the attendee list
  const handleRemove = (id) => {
    removeAttendee(eventId, id).then(() => {
      //Thid is an update state to remove the deleted attendee from the list
      setAttendees((prevAttendees) => prevAttendees.filter((a) => a.id !== id));
    });
  };
  //This is a function to mark an attendee as RSVP and updates that user as attending to the event
  const handleRSVP = (id) => {
    updateAttendee(eventId, id, { rsvp: true }).then(() => {
      //Reloading the page to reflect the RSVP update
      window.location.reload();
    });
  };
  //This is a function to set an attendee in edit mode within the update form of the attendee list
  const handleEditClick = (attendee) => {
    setEditingAttendee(attendee);
    setUpdatedData({ name: attendee.name, email: attendee.email });
  };
  //This is a function to update attendee details in the edit form of the attendee list
  const handleUpdate = (id) => {
    updateAttendee(eventId, id, updatedData).then(() => {
      //Reloading the page to reflect the updates
      window.location.reload();
    });
  };
  //This is a function to handle input changes for attendee updates, and changes the data once has been updated
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //This is a function to cancel the editing process of the update form in the attendee list
  const handleCancel = () => {
    setEditingAttendee(null);
    setUpdatedData({ name: "", email: "" });
  };

  return (
    <div className="container mt-4">
      {/* Heading for the attendees list */}
      <h2 className="text-center mb-4">Attendees</h2>
      <ul className="list-group">
        {attendees.map((attendee) => (
          <li key={attendee.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
               {/* Display attendee name and email */}
              <strong>{attendee.name}</strong> - {attendee.email}
            </div>
            <div>
              {/* Display additional event details */}
              <small>{attendee.event?.description}</small><br />
              <small>
                {/* Format the event date, if available */}
                {attendee.event?.date ? new Date(attendee.event.date).toLocaleString() : "No Date Available"}
              </small><br />
              <small>{attendee.event?.recurrence}</small>
            </div>
            {/* Button to remove an attendee */}
            <button onClick={() => handleRemove(attendee.id)} className="btn btn-danger btn-sm ms-2">
              Remove
            </button>
             {/* Button to RSVP, all attendees hasn't already RSVP'd by default */}
            {attendee.rsvp === false && (
              <button onClick={() => handleRSVP(attendee.id)} className="btn btn-success btn-sm ms-2">
                RSVP
              </button>
            )}
            {/* Button to enable editing mode for an attendee */}
            <button onClick={() => handleEditClick(attendee)} className="btn btn-warning btn-sm ms-2">
              Update
            </button>
            {/* Display update form when an attendee is being edited */}
            {editingAttendee && editingAttendee.id === attendee.id && (
              <div className="mt-2">
                 {/* Input field for name */}
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="form-control mb-2"
                />
                {/* Input field for email */}
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="form-control mb-2"
                />
                {/* Save button to update attendee details */}
                <button onClick={() => handleUpdate(attendee.id)} className="btn btn-primary btn-sm me-2">
                  Save
                </button>
                {/* Cancel button to discard changes */}
                <button onClick={handleCancel} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
