import "./ConfirmModal.css";
import ReactDOM from "react-dom";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  //Render the modal in a portal to avoid z-index and stacking context issues
  return ReactDOM.createPortal(
    <div className="cm-overlay" onClick={onCancel}>
      <div className="cm-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="cm-title">{title || "Confirm action"}</h2>
        <p className="cm-message">
          {message ||
            "This action is permanent and cannot be reversed. Are you sure you want to continue?"}
        </p>

        <div className="cm-divider"></div>

        <div className="cm-actions">
          <button className="cm-btn cm-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="cm-btn cm-btn--confirm" onClick={onConfirm}>
            Yes, confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
