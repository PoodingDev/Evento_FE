import EventEditModal from "./EventEditModal";
import EventInfoModal from "./EventInfoModal";
import React, { useState } from "react";

export default function EventInfo({ onClose, eventDetails, setEvents }) {
  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => setIsEdit(!isEdit);

  return (
    <>
      {isEdit ? (
        <EventEditModal
          onClose={onClose}
          eventDetails={eventDetails}
          setEvents={setEvents}
          toggleIsEdit={toggleIsEdit}
        />
      ) : (
        <EventInfoModal
          onClose={onClose}
          eventDetails={eventDetails}
          toggleIsEdit={toggleIsEdit}
        />
      )}
    </>
  );
}
