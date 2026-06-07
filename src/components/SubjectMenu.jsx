import React, { useEffect, useRef, useState } from "react";
import "./SubjectMenu.css";
import { deleteSubject, updateSubjectCall } from "../api/actions.js";
import ConfirmModal from "./ConfirmModal.jsx";
import EditSubjectModal from "./EditSubjectModal.jsx";

const MENU_HEIGHT = 110;
const MENU_WIDTH = 160;
const OFFSET = 6;

const SubjectMenu = ({ isOpen, onClose, triggerRef, subject, setSubjects }) => {
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < MENU_HEIGHT && rect.top >= MENU_HEIGHT;

      setCoords({
        top: openUpward
          ? rect.top - MENU_HEIGHT - OFFSET
          : rect.bottom + OFFSET,
        left: Math.min(
          rect.right - MENU_WIDTH,
          window.innerWidth - MENU_WIDTH - 8,
        ),
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showModal) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, showModal, triggerRef]);

  const handleEdit = () => {
    setIsEditing(true);
    onClose?.();
  };

  const handleSave = async (updatedData) => {
    try {
      await updateSubjectCall(subject.subjectId, updatedData);
    } catch (error) {
      console.error("Error updating subject:", error);
      return;
    }

    setSubjects((prev) =>
      prev.map((s) =>
        s.subjectId === subject.subjectId
          ? {
              ...s,
              ...updatedData,
              subjectDescription: updatedData.subjectDescription,
              weeklyGoalSessions: updatedData.weeklyGoalSessions,
            }
          : s,
      ),
    );
  };

  const handleDelete = async () => {
    onClose?.();

    try {
      await deleteSubject(subject.subjectId);
      setSubjects((prev) =>
        prev.filter((s) => s.subjectId !== subject.subjectId),
      );
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  return (
    <>
      {isEditing && (
        <EditSubjectModal
          subject={subject}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className="subject-menu__dropdown"
          style={{ top: coords.top, left: coords.left }}
        >
          <ConfirmModal
            isOpen={showModal}
            title="Delete subject?"
            message="Are you sure you want to delete this subject? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
          />

          <button
            role="menuitem"
            className="subject-menu__item"
            onClick={handleEdit}
          >
            <svg
              className="subject-menu__item-icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2.5a2.121 2.121 0 013 3L6 17l-4 1 1-4 11.5-11.5z" />
            </svg>
            Edit subject
          </button>

          <div className="subject-menu__divider" />

          <button
            role="menuitem"
            className="subject-menu__item subject-menu__item--danger"
            onClick={() => setShowModal(true)}
          >
            <svg
              className="subject-menu__item-icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 17 6" />
              <path d="M8 6V4h4v2" />
              <path d="M16 6l-1 11H5L4 6" />
              <line x1="10" y1="11" x2="10" y2="15" />
              <line x1="8" y1="11" x2="8" y2="15" />
              <line x1="12" y1="11" x2="12" y2="15" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default SubjectMenu;
