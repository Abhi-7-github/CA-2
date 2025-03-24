import { useState } from "react";
import App from "react";

const EventForm = ({ addEvent }) => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.location) return;

    const response = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      const newEvent = await response.json();
      addEvent(newEvent);
      setEventData({ name: "", date: "", location: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={eventData.name}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={eventData.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
