//@Reference https://stackoverflow.com/questions/67953641/reactjs-prevent-form-submission-not-working?
//@Reference https://stackoverflow.com/questions/66692085/better-way-of-handling-form-data-via-react-usestate?
//@Reference https://dev.to/vishnusatheesh/react-19-hooks-explained-everything-you-need-to-know-4il6?
//@Reference https://dev.to/nadim_ch0wdhury/develop-full-stack-event-management-system-45f9?
//@Reference https://medium.com/@titoadeoye/react-hooks-usestate-with-practical-examples-64abd6df6471
//@Reference https://mattburgess.medium.com/why-would-i-use-react-hook-form-8ae7b905953e
//@Reference https://heyjoshlee.medium.com/using-the-usestate-hook-and-working-with-forms-in-react-js-2139869549d0
//@Reference https://www.geeksforgeeks.org/how-to-handle-input-forms-with-usestate-hook-in-react/?
//@Reference https://getbootstrap.com/docs/4.1/components/forms/?
//@Reference https://getbootstrap.com/docs/5.0/forms/form-control/?
//Imported the React and useState for managing component state of the react frontend
import React, { useState } from "react";
//This imports the function that sends attendee data to the backend from the frontend of the application
import { addAttendee } from "../api";

const AddAttendee = ({ eventId, onAttendeeAdded }) => {
  //State variables to store the attendee's name and email when adding an attendee to a new event
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //The function to handle form submission when adding a new attendee to an event
  const handleSubmit = (e) => {
    //This prevents the default form submission behavior when the page reloads, this is for handling unwanted behaviour during form submission
    e.preventDefault();
    //This calls the API function to add the attendee, while also passing the necessary details needed such as name, email, event_id and the rsvp
    addAttendee({ name, email, event_id: eventId, rsvp: true }).then((res) => {
      //This calls the react frontend parent component's function to update the UI with the new attendee so that it will be visable in the attendee list
      onAttendeeAdded(res.data);
      //This clears the input fields from the form after successful submission, to keep the form clean and ready for another use
      setName("");
      setEmail("");
    });
  };

  return (
    <div className="container mt-4"> {/* Bootstrap container */}
      {/* Page heading */}
      <h2 className="text-center mb-4">Add Attendee</h2>
      {/* Form for adding an attendee */}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            value={name}
            //Updates name state as user types into the input field
            onChange={(e) => setName(e.target.value)}
            //Placeholder text of "name" inside the input field
            placeholder="Name"
            //Bootstrap class for styling the forms input fields
            className="form-control"
            //This ensures that this field must be filled before submitting the form
            required
          />
        </div>
        <div className="mb-3">
          {/* Input field of the form for the attendee's email */}
          <label htmlFor="email" className="form-label">Email</label> 
          <input
            id="email"
            //This specifies that this is an email input field of the form
            type="email"
            value={email}
            //This updates email state as user types into the input field of the form
            onChange={(e) => setEmail(e.target.value)}
            //Placeholder text of "email" inside the input field
            placeholder="Email"
            //Bootstrap class for styling the forms input fields
            className="form-control"
            //This ensures that this field must be filled before submitting the form
            required
          />
        </div>
        {/* Bootstrap-styled button */}
        <div className="text-center">
        <div className="text-center"></div>
          {/* Submit button section */}
          <button type="submit" className="btn btn-primary">Add</button>
        </div> 
      </form>
    </div>
  );
};
 //Exports the component so it can be used in other parts of the react app
export default AddAttendee;
