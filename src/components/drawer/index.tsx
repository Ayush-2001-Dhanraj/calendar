import React, { useEffect, useRef, useState } from "react";
import styles from "./drawer.module.css";
import TimePicker from "../timePicker";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IoCloseCircle } from "react-icons/io5";
import {
  getSelectedDate,
  setSelectedDate,
  getSelectedHour,
  closeDrawer,
  getUser,
  fetchEventsFromBackend,
  getSelectedEvent,
} from "../../redux/appSlice";
import { motion } from "framer-motion";
import {
  convertTo12Hour,
  convertTo24Hour,
  getFormattedDate,
} from "../../utils/dateTimeHelpers";
import UserService from "../../services/UserServices";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  top?: number;
  left?: number;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, top, left }) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [isEdit, setIsEdit] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(getUser);

  const selectedDate = useAppSelector(getSelectedDate);
  const userSelectedHour = useAppSelector(getSelectedHour);
  const selectedEventID = useAppSelector(getSelectedEvent);
  const dispatch = useAppDispatch();

  const eventDefault = {
    title: "",
    description: "",
    time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
  };

  const [event, setEvent] = useState(eventDefault);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (["hours", "minutes", "period"].includes(e.target.name)) {
      let time = "";
      switch (e.target.name) {
        case "hours":
          setSelectedHour(e.target.value);
          time = `${e.target.value}:${selectedMinute} ${selectedPeriod}`;
          break;
        case "minutes":
          setSelectedMinute(e.target.value);
          time = `${selectedHour}:${e.target.value} ${selectedPeriod}`;
          break;
        case "period":
          setSelectedPeriod(e.target.value);
          time = `${selectedHour}:${selectedMinute} ${e.target.value}`;
          break;

        default:
          break;
      }
      setEvent((preV) => ({ ...preV, time }));
    } else if (e.target.name === "date") {
      dispatch(setSelectedDate({ newDate: e.target.value }));
    } else setEvent((preV) => ({ ...preV, [e.target.name]: e.target.value }));
  };

  const setEventTime = (hour: string) => {
    let hr: string | number = parseInt(hour.split(":")[0]);
    hr = hr < 10 ? "0" + hr : hr;
    const min = hour.split(":")[1].split(" ")[0];
    const per = hour.split(":")[1].split(" ")[1];
    setSelectedHour(hr as string);
    setSelectedMinute(min);
    setSelectedPeriod(per);
    setEvent((preV) => ({ ...preV, time: `${hr}:${min} ${per}` }));
  };

  const getSelectedEventDetails = async (eventID: string) => {
    const response = await UserService.getEvent(eventID);
    if (response.msg) {
      toast.error(response.msg);
    } else {
      const { id, user_id, ...eventDetails } = response.event;
      const transformedEventDetails = {
        title: eventDetails.title,
        description: eventDetails.description,
        time: convertTo12Hour(eventDetails.event_time),
      };
      setEvent(transformedEventDetails);
      setEventTime(convertTo12Hour(eventDetails.event_time));
    }
  };

  const handleFormSubmit = async () => {
    const formattedDate = getFormattedDate(selectedDate);

    const formattedEvent = {
      ...event,
      eventDate: formattedDate,
      eventTime: convertTo24Hour(event.time),
    };

    let result;

    if (selectedEventID) {
      // Update current Event Flow
      result = await UserService.updateEvent(selectedEventID, formattedEvent);
    } else {
      // Add new Event Flow
      result = await UserService.createEvent(user.id, formattedEvent);
    }

    if (!result.event) {
      toast.error("Something went wrong!");
    } else {
      dispatch(fetchEventsFromBackend(user.id));
      setEvent(eventDefault);
      dispatch(closeDrawer());
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEventID) {
      await UserService.deleteEvent(selectedEventID);
      dispatch(fetchEventsFromBackend(user.id));
      setEvent(eventDefault);
      dispatch(closeDrawer());
    }
  };

  useEffect(() => {
    if (userSelectedHour) {
      setEventTime(userSelectedHour);
    }
  }, [userSelectedHour]);

  useEffect(() => {
    if (selectedEventID) {
      getSelectedEventDetails(selectedEventID);
    } else {
      setEvent((preEvent) => {
        return { ...preEvent, description: "", title: "" };
      });
    }
    setIsEdit(false);
  }, [selectedEventID]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      ref={drawerRef}
      className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
      style={{
        top: isOpen
          ? top &&
            window.innerHeight - top > (drawerRef.current?.clientHeight || 200)
            ? top + "px"
            : `calc(100vh - ${(drawerRef.current?.clientHeight || 0) + 10}px)`
          : "100%",
        left:
          left && window.innerWidth - left > 310
            ? left + "px"
            : "calc(100vw - 310px)",
      }}
    >
      <div className={styles.actionIconContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoCloseCircle />
        </button>

        {selectedEventID && (
          <button className={styles.closeButton} onClick={handleDeleteEvent}>
            <MdDelete />
          </button>
        )}
      </div>

      <form>
        <div>
          <input
            placeholder="Add Title"
            onChange={handleChange}
            name="title"
            value={event.title}
            disabled={!!selectedEventID && !isEdit}
          />
        </div>

        <div>
          <input
            type="date"
            placeholder="haha"
            name="date"
            onChange={handleChange}
            value={selectedDate.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            disabled={!!selectedEventID && !isEdit}
            required
          />
        </div>

        <div className={styles.dntSection}>
          <TimePicker
            onChange={handleChange}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            selectedPeriod={selectedPeriod}
            disabled={!!selectedEventID && !isEdit}
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Add Description"
            onChange={handleChange}
            value={event.description}
            disabled={!!selectedEventID && !isEdit}
          />
        </div>

        <button
          className={`${styles.dateBtn} ${styles.saveBtn}`}
          onClick={(e) => {
            e.preventDefault();
            if (!!selectedEventID && !isEdit) {
              setIsEdit(true);
            } else {
              handleFormSubmit();
            }
          }}
        >
          {selectedEventID
            ? isEdit
              ? "Update Event"
              : "Edit Event"
            : "Create Event"}
        </button>
      </form>
    </motion.div>
  );
};

export default Drawer;
