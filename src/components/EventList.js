import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent, updateEvent } from "../api";

const EventList = ({ onSelect }) => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventData, setEventData] = useState({ title: "", description: "", date: "" });

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteEvent(id).then(() => setEvents(events.filter((event) => event.id !== id)));
  };

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setEventData({
      title: event.title,
      description: event.description,
      date: event.date,
    });
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Events</h2>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
            </div>
            <div>
              <button className="btn btn-info btn-sm me-2" onClick={() => onSelect(event)}>
                View
              </button>
              <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
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
                  <button className="btn btn-success me-2" onClick={() => handleUpdate(event.id)}>
                    Save
                  </button>
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

export default EventList;
