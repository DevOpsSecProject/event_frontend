import React, { useState } from "react";
import { createEvent } from "../api";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent({ title, description, date, recurrence }).then((res) => {
      onEventCreated(res.data);
      setTitle("");
      setDescription("");
      setDate("");
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="mb-3">
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

        <button type="submit" className="btn btn-primary w-100">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
