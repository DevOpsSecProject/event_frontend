//@Reference https://www.bezkoder.com/react-hooks-crud-axios-api/?
//@Reference https://www.javaguides.net/2020/08/reactjs-axios-get-post-put-and-delete-example-tutorial.html?
//@Reference https://dzone.com/articles/crud-operations-using-reactjs-hooks-and-web-api?
//This imports Axios for making HTTP requests from the frontend to the backend
import axios from "axios";
//This is where the HTTP requests are sent from the frontend to the base API URL of the backend
const API_URL = "http://localhost:3000";
//This fetches the list of events from the server
export const getEvents = () => axios.get(`${API_URL}/events`);
//This send a request to cretae a new event with its own data
export const createEvent = (data) => axios.post(`${API_URL}/events`, data);
//Thios updates and existing event based off the events id and its own data
export const updateEvent = (id, data) => axios.put(`${API_URL}/events/${id}`, data);
//This deletes an event based on its id
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);
//This fetches the list of attendees for a specific event
export const getAttendees = (eventId) => axios.get(`${API_URL}/events/${eventId}/attendees`);
//This adds a new attendee to an event with their own data
export const addAttendee = (data) => axios.post(`${API_URL}/events/${data.event_id}/attendees`, data);
//This updates an added attendees details such as their name or email
export const updateAttendee = (eventId, id, data) => axios.put(`${API_URL}/events/${eventId}/attendees/${id}`, { attendee: data });
//this deletes an attendee from a specific event based on their id
export const removeAttendee = (eventId, id) => axios.delete(`${API_URL}/events/${eventId}/attendees/${id}`);
