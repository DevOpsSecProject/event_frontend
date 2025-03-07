//@Reference https://www.bezkoder.com/react-hooks-crud-axios-api/?
//@Reference https://www.javaguides.net/2020/08/reactjs-axios-get-post-put-and-delete-example-tutorial.html?
//@Reference https://dzone.com/articles/crud-operations-using-reactjs-hooks-and-web-api?
//Importing the Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
//Importing the React and the useState hook
import React, { useState } from "react";
//Importing the child components
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import AttendeeList from "./components/AttendeeList";
import AddAttendee from "./components/AddAttendee";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Event Scheduling App</h1>

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
