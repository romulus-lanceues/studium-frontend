import { useState, useEffect } from "react";

export default function useSubjectModal(isOpen, onClose, sessionType) {
  const [activeTab, setActiveTab] = useState("timer");
  const [visible, setVisible] = useState(false);

  const [timerHeroStyle, setTimerHeroStyle] = useState(
    "subject-modal__timer-hero",
  );
  const [timeDisplayStyle, setTimeDisplayStyle] = useState(
    "subject-modal__time-display",
  );
  const [sessionTypeStyle, setSessionTypeStyle] = useState("session__type");
  const [sessionTypeText, setSessionTypeText] = useState("");

  useEffect(() =>
    //Logic to determine timer hero background and time display color based on session type (WORK vs BREAK)
    {
      if (sessionType === "WORK") {
        setTimerHeroStyle(
          "subject-modal__timer-hero subject-modal__timer-hero--active",
        );
        setTimeDisplayStyle(
          "subject-modal__time-display subject-modal__time-display--active",
        );
        setSessionTypeStyle("session__type session__type--active");
        setSessionTypeText("Work Session");
      } else if (sessionType === "BREAK") {
        setTimerHeroStyle(
          "subject-modal__timer-hero subject-modal__timer-hero--break",
        );
        setTimeDisplayStyle(
          "subject-modal__time-display subject-modal__time-display--break",
        );
        setSessionTypeStyle("session__type session__type--break");
        setSessionTypeText("Break Session");
      } else {
        setTimerHeroStyle("subject-modal__timer-hero");
        setTimeDisplayStyle("subject-modal__time-display");
        setSessionTypeStyle("session__type");
        setSessionTypeText("");
      }
    }, [sessionType]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return {
    activeTab,
    setActiveTab,
    visible,
    setVisible,
    timerHeroStyle,
    timeDisplayStyle,
    sessionTypeStyle,
    sessionTypeText,
    handleClose,
  };
}
