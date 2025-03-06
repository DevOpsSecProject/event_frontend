import React, { useState } from "react";
import { updateEvent } from "../api";

const UpdateEvent = ({ event, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [recurrence, setRecurrence] = useState(event.recurrence);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(event.id, { title, description, date, recurrence }).then((res) => {
      onEventUpdated(res.data);
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Event</h2>
      <form onSubmit={handleSubmit} className="form-container">
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
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
