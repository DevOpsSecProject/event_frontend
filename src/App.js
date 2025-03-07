import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import {Container, Row, Col, Nav, Tab, Button, Table} from "react-bootstrap";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import AttendeeList from "./components/AttendeeList";
import AddAttendee from "./components/AddAttendee";
import EventDetailPage from "./components/EventDetailPage";
function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeTab, setActiveTab] = useState('events');
    const [viewingEventDetails, setViewingEventDetails] = useState(false);
    const handleEventSelect = (event) => {
        setSelectedEvent(event);
    };

    const handleViewDetails = () => {
        setViewingEventDetails(true);
        setActiveTab('eventDetails')
    }

    const handleBackToEvents = () => {
        setViewingEventDetails(false)
        setActiveTab('events');
    }
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Event Manager</h1>
            <Tab.Container id="event-tabs" activeKey={activeTab} onSelect={setActiveTab}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="events">Events</Nav.Link>
                            </Nav.Item>
                            {selectedEvent && (
                                <Nav.Item>
                                    <Nav.Link eventKey="attendees">Attendees</Nav.Link>
                                </Nav.Item>
                            )}
                            {selectedEvent && viewingEventDetails && (
                                <Nav.Item>
                                    <Nav.Link eventKey="eventDetails">Event Details</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="events">
                                <CreateEvent onEventCreated={() => window.location.reload()}/>

                                {selectedEvent && !viewingEventDetails && (
                                    <div className="my-3">
                                        <h4>Selected: {selectedEvent.title}</h4>
                                        <Button
                                            variant="primary"
                                            onClick={handleViewDetails}
                                            className="mb-3"
                                        >
                                            View Details Page
                                        </Button>
                                    </div>
                                )}

                                <EventList onSelect={handleEventSelect}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="attendees">
                                {selectedEvent && (
                                    <>
                                        <h3>Attendees for: {selectedEvent.title}</h3>
                                        <AttendeeList eventId={selectedEvent.id}/>
                                        <AddAttendee
                                            eventId={selectedEvent.id}
                                            onAttendeeAdded={() => window.location.reload()}
                                        />
                                    </>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="eventDetails">
                                {selectedEvent && viewingEventDetails && (
                                    <>
                                        <Button
                                            variant="secondary"
                                            onClick={handleBackToEvents}
                                            className="mb-3"
                                        >
                                            Back to events
                                        </Button>
                                        <EventDetailPage eventId={selectedEvent.id}/>
                                    </>
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default App;
