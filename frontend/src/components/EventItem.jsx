import { useEffect, useState } from "react";
import EventItem from "./EventItem";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      {events.length > 0 ? (
        events.map((event) => <EventItem key={event._id} event={event} />)
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventList;
