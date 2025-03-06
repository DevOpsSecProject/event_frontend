import React, { useState } from "react";
import { addAttendee } from "../api";

const AddAttendee = ({ eventId, onAttendeeAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addAttendee({ name, email, event_id: eventId, rsvp: true }).then((res) => {
      onAttendeeAdded(res.data);
      setName("");
      setEmail("");
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Attendee</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendee;
