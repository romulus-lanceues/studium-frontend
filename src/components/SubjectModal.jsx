import "./SubjectModal.css";
import useSubjectSessionHistory from "../hooks/useSubjectSessionHistory.js";
import useTimer from "../hooks/useTimer.js";
import useSubjectModal from "../hooks/useSubjectModal.js";
import {
  getStatusBadgeClass,
  getStatusBadgeText,
} from "../utils/subjectModalStatusBadges.js";

export default function SubjectModal({ isOpen, onClose, subject }) {
  //Timer tab hooks and state
  const {
    time,
    setTime,
    startTimer,
    pauseTimer,
    stopTimer,
    timerRunning,
    note,
    setNote,
    sessionType,
  } = useTimer();

  const minute = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  //History tab hooks and state
  const {
    history,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useSubjectSessionHistory(subject.subjectId);

  const {
    activeTab,
    setActiveTab,
    visible,
    setVisible,
    timerHeroStyle,
    timeDisplayStyle,
    sessionTypeStyle,
    sessionTypeText,
    handleClose,
  } = useSubjectModal(isOpen, onClose, sessionType);

  if (!isOpen) return null;

  return (
    <div
      className={`subject-modal__overlay ${visible ? "subject-modal__overlay--visible" : ""}`}
      onClick={(e) =>
        timerRunning ? null : e.target === e.currentTarget && handleClose()
      }
    >
      <div
        className={`subject-modal__panel ${visible ? "subject-modal__panel--visible" : ""}`}
      >
        {/* Header */}
        <div className="subject-modal__header">
          <div className="subject-modal__header-left">
            <div className="subject-modal__icon">📚</div>
            <div>
              <h2 className="subject-modal__title gradient-text">
                {subject.subjectName}
              </h2>
              <p className="subject-modal__description text-muted text-small">
                {subject.subjectDescription}
              </p>
            </div>
          </div>
          <button
            className="subject-modal__close"
            onClick={handleClose}
            aria-label="Close"
            disabled={timerRunning}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Stats Row */}
        <div className="subject-modal__stats">
          <div className="subject-modal__stat-card">
            <span className="subject-modal__stat-value">
              {subject.pomodorosCompleted}
            </span>
            <span className="subject-modal__stat-label text-muted text-small">
              Sessions
            </span>
          </div>
          <div className="subject-modal__stat-card">
            <span className="subject-modal__stat-value">
              {`${Math.floor(subject.totalStudyTime / 60)}h ${subject.totalStudyTime % 60}m`}
            </span>
            <span className="subject-modal__stat-label text-muted text-small">
              Total Time
            </span>
          </div>
          <div className="subject-modal__stat-card">
            <span className="subject-modal__stat-value">
              🔥 {subject.streak}
            </span>
            <span className="subject-modal__stat-label text-muted text-small">
              Day Streak
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="subject-modal__tabs">
          {["timer", "history"].map((tab) => (
            <button
              key={tab}
              className={`subject-modal__tab ${activeTab === tab ? "subject-modal__tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
              disabled={timerRunning}
            >
              {tab === "timer" ? "⏱ Timer" : "📋 History"}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        <div className="subject-modal__content">
          {/* ── TIMER TAB ── */}
          {activeTab === "timer" && (
            <div className="subject-modal__timer">
              {/* TOP SECTION — duration + display grouped as one unit */}
              <div className={timerHeroStyle}>
                {/* TIMER DISPLAY — replace "00:00" with your live timer value */}
                <div className={timeDisplayStyle}>
                  {minute}:{seconds}
                </div>

                <div className="session__type-container">
                  <p className={sessionTypeStyle}>{sessionTypeText}</p>
                </div>
                {/* DURATION PILLS — attach onClick to each pill to set your duration,
                add the class 'subject-modal__pill--active' to the selected one */}
              </div>

              <div className="subject-modal__timer-divider" />

              <div className="subject-modal__pill-group">
                <button
                  className={`subject-modal__pill ${time === 25 * 60 ? "subject-modal__pill--active" : ""}`}
                  onClick={() => setTime(1 * 60)}
                  disabled={timerRunning}
                >
                  25 min
                </button>
                <button
                  className={`subject-modal__pill ${time === 50 * 60 ? "subject-modal__pill--active" : ""}`}
                  onClick={() => setTime(50 * 60)}
                  disabled={timerRunning}
                >
                  50 min
                </button>
              </div>

              {/* SESSION NOTE (optional) — bind value and onChange to your note state */}
              <div className="subject-modal__note-wrapper">
                <label className="subject-modal__note-label form-label">
                  Session Note
                  <span className="subject-modal__note-optional text-muted">
                    {" "}
                    — optional
                  </span>
                </label>

                <textarea
                  className="subject-modal__note-input form-input"
                  placeholder="What do you want to focus on this session?"
                  rows={3}
                  maxLength={200}
                  disabled={timerRunning}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                {/* CHARACTER COUNTER — replace "0" with your note.length value */}
                <span className="subject-modal__note-count text-muted text-small">
                  0 / 200
                </span>
              </div>

              <div className="subject-modal__timer-divider" />

              {/* TIMER CONTROLS — Start | Pause (middle/primary) | Stop */}
              <div className="subject-modal__controls">
                {/* START button — attach your start handler here */}
                <button
                  className="btn btn-secondary subject-modal__ctrl-btn"
                  onClick={() => startTimer(subject.subjectId)}
                >
                  Start
                </button>

                {/* PAUSE button (primary, center) — attach your pause handler here */}
                <button
                  className="btn btn-primary subject-modal__ctrl-btn subject-modal__ctrl-btn--pause"
                  onClick={pauseTimer}
                >
                  Pause
                </button>

                {/* STOP button — attach your stop handler here */}
                <button
                  className="btn btn-secondary subject-modal__ctrl-btn"
                  onClick={stopTimer}
                >
                  Stop
                </button>
              </div>
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <div className="subject-modal__history">
              {history.length === 0 ? (
                <div className="subject-modal__empty">
                  <p className="text-muted text-small">
                    No sessions recorded yet. Start your first session!
                  </p>
                </div>
              ) : (
                <>
                  {/* SESSION LIST — render your paginated sessions here (e.g. currentPageSessions.map(...)) */}
                  <div className="subject-modal__history-list">
                    {history.map((session) => (
                      <div
                        key={session.id}
                        className={`subject-modal__history-item ${!session.completed ? "subject-modal__history-item--incomplete" : ""}`}
                      >
                        <div className="subject-modal__history-left">
                          <div
                            className={`subject-modal__history-dot ${session.type === "WORK" ? "subject-modal__history-dot--focus" : "subject-modal__history-dot--break"}`}
                          />
                          <div>
                            <span className="subject-modal__history-mode">
                              {session.notes}
                            </span>
                            <span className="subject-modal__history-date text-muted text-small">
                              {new Date(session.startTime).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="subject-modal__history-right">
                          <span className="subject-modal__history-duration">
                            {session.actualDurationMinutes} mins
                          </span>
                          <span className={getStatusBadgeClass(session)}>
                            {getStatusBadgeText(session)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PAGINATION — wire currentPage and totalPages from your state */}
                  <div className="subject-modal__pagination">
                    {/* PREVIOUS button — attach your previous page handler here, add 'disabled' when on page 1 */}
                    <button
                      className="subject-modal__page-btn"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 0}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Prev
                    </button>

                    {/* PAGE INDICATOR — replace "1 / 1" with your currentPage and totalPages */}
                    <span className="subject-modal__page-indicator text-muted text-small">
                      Page {currentPage + 1} / {totalPages}
                    </span>

                    {/* NEXT button — attach your next page handler here, add 'disabled' when on last page */}
                    <button
                      className="subject-modal__page-btn"
                      onClick={handleNextPage}
                      disabled={currentPage >= totalPages - 1}
                    >
                      Next
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
