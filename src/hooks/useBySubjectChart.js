import { useState, useEffect } from "react";
import configureCurrentMonth from "../utils/configureCurrentMonth";
import { getMonthlySubjectDistribution } from "../api/data";

export default function useBySubjectChart() {
  const [data, setData] = useState([]);

  const retrieveMonthlySubjectDistribution = () => {
    const currentMonth = configureCurrentMonth();

    return getMonthlySubjectDistribution(currentMonth).then((result) => {
      const subjectDistribution = result.map((subject) => ({
        name: subject.subjectName,
        sessions: subject.sessionCount,
        color: subject.subjectColor,
      }));

      setData(subjectDistribution);
    });
  };

  useEffect(() => {
    retrieveMonthlySubjectDistribution();
  }, []);

  return { data };
}
