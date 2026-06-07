import { useState, useEffect, useCallback } from "react";

import {
  getDashboardData,
  getUserSessionHistory,
  getWeeklyData,
} from "../api/data";

export default function useDashboard(setFullScreenLoading) {
  const [username, setUsername] = useState("User");

  //Stats
  const [streak, setStreak] = useState(0);
  const [lastSession, setLastSession] = useState("none");
  const [sessionsToday, setSessionsToday] = useState(0);
  const [sessionsCompletedThisWeek, setSessionsCompletedThisWeek] = useState(0);
  const [sessionsCancelledThisWeek, setSessionsCancelledThisWeek] = useState(0);
  const [weeklyPercentage, setWeeklyPercentage] = useState(0);

  //Messages about changes in the week
  const [totalSessionForTodayMessage, setTotalSessionForTodayMessage] =
    useState("");
  const [changesMessage, setChangesMessage] = useState([]);

  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadDashboardData = useCallback(async () => {
    setFullScreenLoading(true);

    try {
      const dashboardData = await getDashboardData();
      setUsername(dashboardData.username);
      setStreak(dashboardData.streak);
      setLastSession(dashboardData.lastSession);
      setSessionsToday(dashboardData.sessionsCompletedToday);
      setTotalSessionForTodayMessage(
        dashboardData.sessionsTodayValidationMessage,
      );

      const sessionHistory = await getUserSessionHistory(0);
      setTotalPages(sessionHistory.totalPages);
      setHistory(sessionHistory.content);

      const weeklyData = await getWeeklyData();
      setSessionsCompletedThisWeek(weeklyData.completedSessionsCount);
      setSessionsCancelledThisWeek(weeklyData.cancelledSessionsCount);
      setWeeklyPercentage(weeklyData.percentage);
      setChangesMessage(weeklyData.changes ?? []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setFullScreenLoading(false);
    }
  }, [setFullScreenLoading]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  useEffect(() => {
    if (currentPage === 0) return;

    getUserSessionHistory(currentPage)
      .then((data) => setHistory(data.content))
      .catch((err) =>
        console.error("Error fetching user session history:", err),
      );
  }, [currentPage]);

  function handleNextPage() {
    setCurrentPage((prev) => {
      if (prev >= totalPages - 1) return currentPage;
      return prev + 1;
    });
  }

  function handlePreviousPage() {
    if (currentPage > 0) {
      getUserSessionHistory(currentPage - 1) //
        .then((data) => {
          setCurrentPage(currentPage - 1);
          setHistory(data.content);
        })
        .catch((error) => {
          console.error("Error fetching user session history:", error);
        });
    }
  }

  return {
    username,
    streak,
    lastSession,
    sessionsToday,
    history,
    currentPage,
    totalPages,
    loadDashboardData,
    handleNextPage,
    handlePreviousPage,
    sessionsCompletedThisWeek,
    sessionsCancelledThisWeek,
    weeklyPercentage,
    changesMessage,
    totalSessionForTodayMessage,
  };
}
