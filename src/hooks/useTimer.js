import { useState, useEffect, useRef } from "react";
import {
  createSession,
  cancelSession,
  completeSession,
} from "../api/session.js";

export default function useTimer() {
  //Timer state
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [note, setNote] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessionType, setSessionType] = useState("");
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!sessionCompleted || !currentSessionId) return;

    const handleSessionCompletion = async () => {
      try {
        await completeSession(currentSessionId);
        setTimerRunning(false);
        alert("Session completed!");
        setCurrentSessionId(null);
        setSessionType("");
        setNote("");
        setSessionCompleted(false);
      } catch (error) {
        console.error("Failed to complete session:", error);
      }
    };

    handleSessionCompletion();
  }, [sessionCompleted, currentSessionId]);

  const startTimer = async (subjectId) => {
    if (intervalRef.current) return;

    if (time === 0) {
      return;
    }

    if (currentSessionId) {
      setTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setSessionCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return;
    }

    try {
      const startSessionRequest = createStartSessionRequest(note);

      const response = await createSession(subjectId, startSessionRequest);

      setCurrentSessionId(response.id);
      setSessionType(response.type);
      setNote("");

      if (response.id) {
        setTimerRunning(true);
        intervalRef.current = setInterval(() => {
          setTime((prev) => {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              setSessionCompleted(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
      return;
    }
  };

  const createStartSessionRequest = (note) => {
    const startSessionRequest = {
      sessionType: "WORK",
      plannedDuration: time / 60,
      notes: note,
    };
    return startSessionRequest;
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const stopTimer = async () => {
    if (currentSessionId) {
      try {
        await cancelSession(currentSessionId);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
        setTimerRunning(false);
        setNote("");
        setCurrentSessionId(null);
        setSessionType("");
      } catch (error) {
        console.error("Failed to cancel session:", error);
      }
    }
  };

  //setInterval for the logic

  return {
    time,
    setTime,
    startTimer,
    pauseTimer,
    stopTimer,
    timerRunning,
    note,
    setNote,
    sessionType,
  };
}
