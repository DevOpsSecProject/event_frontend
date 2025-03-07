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
//This imports the function that sends event data to the backend from the frontend of the application
import { getEvents, deleteEvent, updateEvent } from "../api";

const EventList = ({ onSelect }) => {
  //State that stores the list of events
  const [events, setEvents] = useState([]);
  //State to track what event is being editied
  const [editingEventId, setEditingEventId] = useState(null);
  //State to store the data once edited
  const [eventData, setEventData] = useState({ title: "", description: "", date: "" });
  //This fetches the events when the component mounts
  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
  }, []);
  //This is a function that handles the deletion of an event
  const handleDelete = (id) => {
    deleteEvent(id).then(() => setEvents(events.filter((event) => event.id !== id)));
  };
  //This is a funtion that initiates the event editing update
  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setEventData({
      title: event.title,
      description: event.description,
      date: event.date,
    });
  };
  //This is a funtion that handles the updating of the event
  const handleUpdate = (id) => {
    updateEvent(id, eventData)
      .then(() => {
        setEditingEventId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };
  //This is a funtion to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <h2 className="text-center mb-4">Events</h2>
      {/* List of Events */}
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {/* Display event title and formatted date */}
              <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
            </div>
            <div>
              {/* View Button */}
              <button className="btn btn-info btn-sm me-2" onClick={() => onSelect(event)}>
                View
              </button>
              {/* Delete Button */}
              <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
              {/* Edit Button */}
              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(event)}>
                Update
              </button>

              {/* Show Update Form if the event is being edited */}
              {editingEventId === event.id && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    className="form-control mb-2"
                  />
                  <input
                    type="datetime-local"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  {/* Save Button */}
                  <button className="btn btn-success me-2" onClick={() => handleUpdate(event.id)}>
                    Save
                  </button>
                  {/* Cancel Button */}
                  <button className="btn btn-secondary" onClick={() => setEditingEventId(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
// Export the component for use in other parts of the application
export default EventList;
