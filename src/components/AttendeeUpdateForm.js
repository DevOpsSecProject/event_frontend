import React, { useState } from "react";
import { updateAttendee } from "../api";

const AttendeeUpdateForm = ({ eventId, attendeeId, currentAttendeeData }) => {
  const [name, setName] = useState(currentAttendeeData.name);
  const [email, setEmail] = useState(currentAttendeeData.email);
  const [rsvp, setRsvp] = useState(currentAttendeeData.rsvp);

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
      <h3 className="text-center mb-4">Update Attendee</h3>
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
      <button onClick={handleUpdate} className="btn btn-primary w-100">
        Update Attendee
      </button>
    </div>
  );
};

export default AttendeeUpdateForm;
