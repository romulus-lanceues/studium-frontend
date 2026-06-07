import "./Subjects.css";
import Sidebar from "../components/Sidebar.jsx";
import useSidebar from "../hooks/useSidebar.js";
import SubjectCard from "../components/SubjectCard.jsx";
import useSubject from "../hooks/useSubject.js";
import FullPageLoading from "../components/FullPageLoading.jsx";
import { useLoaderContext } from "../context/LoaderContext.jsx";
import CreateSubjectModal from "../components/CreateSubjectModal.jsx";
import { createSubject } from "../api/actions.js";
import { useState } from "react";

export default function Subject() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { fullScreenLoading, setFullScreenLoading } = useLoaderContext();

  //Put in a custome hook later
  const [isCreateSubjectModalOpen, setIsCreateSubjectModalOpen] =
    useState(false);

  const {
    subjects,
    setSubjects,
    totalSubjects,
    totalSessions,
    totalHours,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = useSubject(setFullScreenLoading);

  console.log(subjects);

  return (
    <>
      <FullPageLoading show={fullScreenLoading} />

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <CreateSubjectModal
        isOpen={isCreateSubjectModalOpen}
        onClose={() => setIsCreateSubjectModalOpen(false)}
        // TODO: Wire up create subject API call here
        onSubmit={createSubject}
        setSubjects={setSubjects}
      />

      <div className="subjects-page">
        <div className="subjects-header">
          <div className="header-content">
            {/* Burger menu icon */}
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
            <div className="header-text">
              <h1 className="gradient-text">Subjects</h1>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Summary Bar */}
          <div className="subjects-summary">
            <div className="subjects-summary__item">
              <span className="subjects-summary__value gradient-text">
                {subjects.length}
              </span>
              <span className="subjects-summary__label text-muted text-small">
                Subjects
              </span>
            </div>
            <div className="subjects-summary__item">
              <span className="subjects-summary__value gradient-text">
                {totalSessions}
              </span>
              <span className="subjects-summary__label text-muted text-small">
                Total Sessions
              </span>
            </div>
            <div className="subjects-summary__item">
              <span className="subjects-summary__value gradient-text">
                {totalHours}
              </span>
              <span className="subjects-summary__label text-muted text-small">
                Hours Studied
              </span>
            </div>
            <button
              className="btn btn-primary subjects-summary__add"
              onClick={() => setIsCreateSubjectModalOpen(true)}
            >
              + Add Subject
            </button>
          </div>

          {/* Subject Grid */}
          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.subjectId}
                subject={subject}
                index={index}
                setSubjects={setSubjects}
              />
            ))}

            {/* Will only appear at the final page */}

            {currentPage === totalPages - 1 && (
              <div className="subjects-add-card">
                <div className="subjects-add-card__inner">
                  <div className="subjects-add-card__icon">+</div>
                  <p className="text-muted text-small">New Subject</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Pagination ─────────────────────────────────────────────────────
          TODO: Wire up pagination state (currentPage, totalPages) here.
          - Previous button should decrement currentPage (disable on page 1)
          - Next button should increment currentPage (disable on last page)
          - The page indicator in the middle reflects the current page / total
          - Slice the subjects array based on currentPage and a ITEMS_PER_PAGE
            constant before passing them to the grid map above
      ──────────────────────────────────────────────────────────────────── */}
          <div className="subjects-pagination">
            {/* Previous — disable this button when on the first page */}
            <button
              className="subjects-pagination__btn btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              ← Previous
            </button>

            {/* Page indicator — replace hardcoded values with currentPage / totalPages */}
            <span className="subjects-pagination__indicator text-muted text-small">
              Page <strong>{currentPage + 1}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            {/* Next — disable this button when on the last page */}
            <button
              className="subjects-pagination__btn btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
