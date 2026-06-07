import "./Timer.css";
import Sidebar from "../components/Sidebar.jsx";
import useSidebar from "../hooks/useSidebar.js";
import useTimer from "../hooks/useTimer.js";

export default function Timer() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { time, setTime, setRecentTime, startTimer, stopTimer, resetTimer } =
    useTimer();

  const minute = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <>
      <div className="bg-orb-top-right"></div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="timer-page">
        <div className="timer-header">
          <div className="header-content">
            {/* Burger menu icon */}
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
            <div className="header-text">
              <h1 className="gradient-text">Start Timer</h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="timer-display card">
            <span className="time gradient-text">
              {minute}:{seconds}
            </span>
          </div>

          <form className="timer-form mt-4">
            <div className="form-group">
              <label htmlFor="sessionType" className="form-label">
                Session Type
              </label>
              <select
                id="sessionType"
                className="form-input"
                value={time / 60}
                onChange={(e) => {
                  setTime(e.target.value * 60);
                  setRecentTime(e.target.value * 60);
                }}
              >
                <option value="0">Select a session</option>
                <option value="1">Pomodoro (25 min)</option>
                <option value="50"> Pomodoro (50 min)</option>
              </select>
            </div>
          </form>

          <div className="timer-controls">
            <button className="btn btn-primary start" onClick={startTimer}>
              Start
            </button>
            <button className="btn btn-secondary stop" onClick={stopTimer}>
              Pause
            </button>
            <button className="btn btn-secondary reset" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
