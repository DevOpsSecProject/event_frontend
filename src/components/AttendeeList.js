import React, { useEffect, useState } from "react";
import { getAttendees, removeAttendee, updateAttendee } from "../api";

const AttendeeList = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", email: "" });


  useEffect(() => {
    getAttendees(eventId).then((res) => setAttendees(res.data));
  }, [eventId]);


  const handleRemove = (id) => {
    removeAttendee(eventId, id).then(() => {
      setAttendees(attendees.filter((a) => a.id !== id));
    });
  };


  const handleRSVP = (id) => {
    updateAttendee(eventId, id, { rsvp: true }).then((res) => {
      setAttendees(attendees.map((a) => (a.id === id ? res.data : a)));
    });
  };


  const handleEditClick = (attendee) => {
    setEditingAttendee(attendee);
    setUpdatedData({ name: attendee.name, email: attendee.email });
  };


  const handleUpdate = (id) => {
    updateAttendee(eventId, id, updatedData).then((res) => {
      setAttendees(attendees.map((a) => (a.id === id ? res.data : a)));
      setEditingAttendee(null);
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCancel = () => {
    setEditingAttendee(null);
    setUpdatedData({ name: "", email: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Attendees</h2>
      <ul className="list-group">
        {attendees.map((attendee) => (
          <li key={attendee.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{attendee.name}</strong> - {attendee.email}
            </div>
            <div>
              <small>{attendee.event?.description}</small><br />
              <small>{new Date(attendee.event?.date).toLocaleString()}</small><br />
              <small>{attendee.event?.recurrence}</small>
            </div>



 
            <button onClick={() => handleRemove(attendee.id)} className="btn btn-danger btn-sm ms-2">
              Remove
            </button>

            {attendee.rsvp === false && (
              <button onClick={() => handleRSVP(attendee.id)} className="btn btn-success btn-sm ms-2">
                RSVP
              </button>
            )}


            <button onClick={() => handleEditClick(attendee)} className="btn btn-warning btn-sm ms-2">
              Update
            </button>


            {editingAttendee && editingAttendee.id === attendee.id && (
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="form-control mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="form-control mb-2"
                />
                <button onClick={() => handleUpdate(attendee.id)} className="btn btn-primary btn-sm me-2">
                  Save
                </button>
 
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
