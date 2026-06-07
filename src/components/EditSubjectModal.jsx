import "./EditSubjectModal.css";
import { useState } from "react";

const PRESET_COLORS = [
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#14b8a6",
  "#0ea5e9",
  "#6366f1",
];

const EditSubjectModal = ({ subject, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    subjectName: subject.subjectName ?? "",
    subjectDescription:
      subject.subjectDescription ?? subject.subjectDescription ?? "",
    weeklyGoalSessions:
      subject.weeklyGoalSessions ?? subject.weeklyGoalSessions ?? "",
    subjectColor: subject.color ?? PRESET_COLORS[0],
  });
  const [customColor, setCustomColor] = useState("");

  const handleColorSelect = (color) => {
    setFormData((prev) => ({ ...prev, subjectColor: color }));
    setCustomColor("");
  };

  const handleCustomColor = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setFormData((prev) => ({ ...prev, subjectColor: color }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(formData);
    onClose?.();
  };

  return (
    <div className="edit-subject-overlay" onClick={handleOverlayClick}>
      <div
        className="edit-subject-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-subject-title"
      >
        <div className="edit-subject-modal__header">
          <div className="edit-subject-modal__title-group">
            <div className="edit-subject-modal__icon">Edit</div>
            <div>
              <h2
                id="edit-subject-title"
                className="edit-subject-modal__title gradient-text"
              >
                Edit Subject
              </h2>
              <p className="edit-subject-modal__subtitle text-muted text-small">
                Update subject details
              </p>
            </div>
          </div>
          <button
            className="edit-subject-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            X
          </button>
        </div>

        <div className="edit-subject-modal__divider" />

        <div className="edit-subject-modal__badge">
          <span
            className="edit-subject-modal__badge-dot"
            style={{ background: formData.subjectColor }}
          />
          <span className="text-muted text-small">Currently editing:</span>
          <span className="edit-subject-modal__badge-value">
            {formData.subjectName || "-"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-subject-name" className="form-label">
              Subject Name{" "}
              <span className="edit-subject-modal__required">*</span>
            </label>
            <input
              id="edit-subject-name"
              type="text"
              className="form-input"
              placeholder="e.g. Mathematics, Biology..."
              value={formData.subjectName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  subjectName: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-subject-desc" className="form-label">
              Description
            </label>
            <textarea
              id="edit-subject-desc"
              className="form-input edit-subject-modal__textarea"
              placeholder="What topics does this subject cover?"
              value={formData.subjectDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  subjectDescription: e.target.value,
                }))
              }
            />
            <p className="edit-subject-modal__hint text-muted text-small">
              Optional - helps you stay focused on the right material.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="edit-weekly-goal" className="form-label">
              Weekly Goal{" "}
              <span className="edit-subject-modal__required">*</span>
            </label>
            <div className="edit-subject-modal__input-wrapper">
              <input
                id="edit-weekly-goal"
                type="number"
                className="form-input edit-subject-modal__hours-input"
                placeholder="e.g. 10"
                min="1"
                max="168"
                value={formData.weeklyGoalSessions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    weeklyGoalSessions: e.target.value,
                  }))
                }
                required
              />
              <span className="edit-subject-modal__input-suffix">
                hrs / week
              </span>
            </div>
            <p className="edit-subject-modal__hint text-muted text-small">
              Recommended: 5-15 hours for most subjects.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker-section">
              <div className="color-swatches">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${
                      formData.subjectColor === color && !customColor
                        ? "color-swatch--active"
                        : ""
                    }`}
                    style={{
                      background: color,
                      boxShadow:
                        formData.subjectColor === color && !customColor
                          ? `0 0 0 3px rgba(255,255,255,0.15), 0 0 12px ${color}99`
                          : "none",
                    }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}

                <div
                  className={`color-swatch color-swatch--custom ${
                    customColor ? "color-swatch--active" : ""
                  }`}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: customColor || "transparent",
                    boxShadow: customColor
                      ? `0 0 0 3px rgba(255,255,255,0.15), 0 0 12px ${customColor}99`
                      : "none",
                  }}
                >
                  {!customColor && <span className="custom-color-icon">+</span>}
                  <input
                    type="color"
                    className="color-input-hidden"
                    value={customColor || formData.subjectColor}
                    onChange={handleCustomColor}
                    title="Custom color"
                  />
                </div>
              </div>

              <div className="color-preview">
                <div
                  className="color-preview-dot"
                  style={{ background: formData.subjectColor }}
                />
                <span className="color-hex text-muted text-small">
                  {formData.color}
                </span>
              </div>
            </div>
          </div>

          <div className="edit-subject-modal__footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubjectModal;
