//Determine status badges based on session status
export const getStatusBadgeClass = (session) => {
  if (
    session.sessionStatus === "COMPLETED" ||
    session.sessionStatus === "IN_PROGRESS"
  ) {
    return "subject-modal__history-badge subject-modal__history-badge--done";
  } else {
    return "subject-modal__history-badge subject-modal__history-badge--skip";
  }
};

export const getStatusBadgeText = (session) => {
  if (session.sessionStatus === "COMPLETED") {
    return "Completed";
  } else if (session.sessionStatus === "IN_PROGRESS") {
    return "In Progress";
  }
  return "Cancelled";
};
