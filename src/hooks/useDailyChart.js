import { getMonthlySummary } from "../api/data";
import { useState, useEffect } from "react";
import configureCurrentMonth from "../utils/configureCurrentMonth";

export default function useDailyChart() {
  const [data, setData] = useState([]);

  const retrieveMonthlySessionData = () => {
    const currentMonth = configureCurrentMonth();

    return getMonthlySummary(currentMonth).then((result) => {
      const monthlySessions = result.map((session) => ({
        date: new Date(session.day).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        sessions: session.sessionCount,
        minutes: session.sessionCount * 25,
      }));

      setData(monthlySessions);
    });
  };

  useEffect(() => {
    retrieveMonthlySessionData();
  }, []);

  return { data };
}
