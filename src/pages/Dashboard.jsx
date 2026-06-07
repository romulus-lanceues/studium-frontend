import "./Dashboard.css";
import Sidebar from "../components/Sidebar.jsx";
import useSidebar from "../hooks/useSidebar.js";
import useDashboard from "../hooks/useDashboard.js";
import FullPageLoading from "../components/FullPageLoading.jsx";
import { useLoaderContext } from "../context/LoaderContext.jsx";
import DailyChart from "../components/DailyChart.jsx";
import BySubjectChart from "../components/BySubjectChart.jsx";

export default function Dashboard() {
  const { fullScreenLoading, setFullScreenLoading } = useLoaderContext();
  //Custom hook for Dashboard
  const {
    username,
    streak,
    lastSession,
    sessionsToday,
    history,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    sessionsCompletedThisWeek,
    sessionsCancelledThisWeek,
    weeklyPercentage,
    changesMessage,
    totalSessionForTodayMessage,
  } = useDashboard(setFullScreenLoading);
  //Custom hook for sidebar
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const completedSessionsChange = changesMessage[0] ?? "";
  const cancelledSessionsChange = changesMessage[1] ?? "";
  const completionRateChange = changesMessage[2] ?? "";

  return (
    <div className="dashboard-page">
      <FullPageLoading show={fullScreenLoading} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="dashboard-header mb-4">
        <div className="header-content">
          {/* Burger menu icon */}
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>

          <div className="header-text">
            <h1 className="gradient-text">Welcome {username}</h1>
            <p className="dashboard-date text-muted">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                weekday: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Welcome Header */}

        {/* Stats Cards Grid */}
        <div className="stats-grid mb-5">
          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">Streak</div>
            <div className="stat-value">{streak}d</div>
          </div>

          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">Last session</div>
            <div className="stat-value">{lastSession}</div>
          </div>

          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">
              Sessions completed today
            </div>
            <div className="stat-value">{sessionsToday} </div>
            <div className="stat-change up">{totalSessionForTodayMessage}</div>
          </div>

          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">
              Total Sessions This Week
            </div>
            <div className="stat-value">{sessionsCompletedThisWeek}</div>
            <div
              className={`stat-change ${completedSessionsChange.includes("more") ? "up" : "down"}`}
            >
              {completedSessionsChange}
            </div>
          </div>

          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">
              Failed Sessions
            </div>
            <div className="stat-value">{sessionsCancelledThisWeek}</div>
            <div
              className={`stat-change ${cancelledSessionsChange.includes("more") ? "up" : "down"}`}
            >
              {cancelledSessionsChange}
            </div>
          </div>

          <div className="card card-compact stat-card">
            <div className="stat-icon purple">
              <i className="fa-sharp-duotone fa-solid fa-address-card"></i>
            </div>
            <div className="stat-label text-muted text-small">
              Completion Rate
            </div>
            <div className="stat-value">{weeklyPercentage}%</div>
            <div
              className={`stat-change ${completionRateChange.includes("increase") ? "up" : "down"}`}
            >
              {completionRateChange}
            </div>
          </div>
        </div>

        {/* Daily Focus Chart (Monthly overview)  */}
        <div className="charts-row">
          <DailyChart />
          <BySubjectChart />
        </div>

        {/* History Section */}
        <div className="card">
          <h2 className="mb-4">My Session History</h2>

          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((session) => (
                  <tr key={session.id}>
                    <td>{new Date(session.startTime).toLocaleDateString()}</td>
                    <td>{session.subjectName}</td>
                    <td>
                      {session.sessionStatus === "COMPLETED" ? (
                        <span className="badge badge-completed">Completed</span>
                      ) : session.sessionStatus === "IN_PROGRESS" ? (
                        <span className="badge badge-in-progress">
                          In Progress
                        </span>
                      ) : (
                        <span className="badge badge-incomplete">
                          Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination placeholder - You'll add logic later */}
          <div className="pagination mt-4">
            <button
              className="btn btn-secondary pagination-btn"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span className="text-muted">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className="btn btn-secondary pagination-btn"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
