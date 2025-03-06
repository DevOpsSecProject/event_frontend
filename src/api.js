import axios from "axios";

const API_URL = "http://localhost:3000";

export const getEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (data) => axios.post(`${API_URL}/events`, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/events/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);

export const getAttendees = (eventId) => axios.get(`${API_URL}/events/${eventId}/attendees`);
export const addAttendee = (data) => axios.post(`${API_URL}/attendees`, data);

export const updateAttendee = (eventId, id, data) => axios.put(`${API_URL}/events/${eventId}/attendees/${id}`, { attendee: data });

export const removeAttendee = (eventId, id) => axios.delete(`${API_URL}/events/${eventId}/attendees/${id}`);
