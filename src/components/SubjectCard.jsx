import "./SubjectCard.css";
import { useState, useRef } from "react";
import SubjectModal from "../components/SubjectModal.jsx";
import SubjectMenu from "./SubjectMenu.jsx";

export default function SubjectCard({ subject, index, setSubjects }) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const emojis = ["📚", "🧠", "🔬", "🎨", "🎵", "🎮"];

  const handleSubjectClick = () => {
    setIsSubjectModalOpen(true);
  };

  return (
    <>
      {isSubjectModalOpen && (
        <SubjectModal
          isOpen={isSubjectModalOpen}
          onClose={() => setIsSubjectModalOpen(false)}
          subject={subject}
        />
      )}

      <SubjectMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={triggerRef}
        //Pass the subject object itself and not just the ID
        subject={subject}
        setSubjects={setSubjects}
      />

      <div
        className="subject-card"
        style={{ animationDelay: `${index * 0.08}s` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow accent */}
        <div
          className="subject-card__glow"
          style={{ background: subject.color }}
        />

        {/* Top row */}
        <div className="subject-card__top">
          <div
            className="subject-card__icon"
            style={{ boxShadow: `0 8px 24px ${subject.color}55` }}
          >
            {emojis[0]}
          </div>
          <button
            className="subject-card__menu"
            aria-label="Options"
            ref={triggerRef}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Name */}
        <h3 className="subject-card__name">{subject.subjectName}</h3>

        {/* Stats row */}
        <div className="subject-card__stats">
          <div className="subject-card__stat">
            <span className="subject-card__stat-value">
              {subject.pomodorosCompleted}
            </span>
            <span className="subject-card__stat-label">Sessions</span>
          </div>
          <div className="subject-card__stat-divider" />
          <div className="subject-card__stat">
            <span className="subject-card__stat-value">
              {subject.totalStudyTime}
            </span>
            <span className="subject-card__stat-label">Total Minutes</span>
          </div>
        </div>

        {/* Footer */}
        <div className="subject-card__footer">
          <span className="subject-card__last">
            📅 Last Session:{" "}
            {subject.lastSession !== null
              ? subject.lastSession
              : "No session yet"}
          </span>
          <button
            className="subject-card__start btn btn-primary"
            onClick={handleSubjectClick}
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}
