import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import AttendeeList from "./components/AttendeeList";
import AddAttendee from "./components/AddAttendee";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Event Manager</h1>

      {/* Create Event Section */}
      <div className="mb-4">
        <CreateEvent onEventCreated={() => window.location.reload()} />
      </div>

      {/* Event List Section */}
      <div className="mb-4">
        <EventList onSelect={setSelectedEvent} />
      </div>

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="card p-3 shadow-lg">
          <h2 className="text-center mb-3">{selectedEvent.title}</h2>

          {/* Attendees List */}
          <AttendeeList eventId={selectedEvent.id} />

          {/* Add Attendee Form */}
          <div className="mt-3">
            <AddAttendee eventId={selectedEvent.id} onAttendeeAdded={() => window.location.reload()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
