import "./CreateSubjectModal.css";
import { useState } from "react";

const PRESET_COLORS = [
  "#8b5cf6", // purple-primary
  "#a855f7", // purple-bright
  "#ec4899", // pink-accent
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
];

export default function CreateSubjectmodal({
  isOpen,
  onClose,
  onSubmit,
  setSubjects,
}) {
  const [formData, setFormData] = useState({
    subjectName: "",
    color: PRESET_COLORS[0],
    description: "",
    weeklyGoal: "",
  });
  const [customColor, setCustomColor] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleColorSelect = (color) => {
    setFormData((prev) => ({ ...prev, color }));
    setCustomColor("");
  };

  const handleCustomColor = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setFormData((prev) => ({ ...prev, color }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectName.trim())
      newErrors.subjectName = "Subject name is required.";
    if (
      !formData.weeklyGoal ||
      isNaN(formData.weeklyGoal) ||
      Number(formData.weeklyGoal) <= 0
    )
      newErrors.weeklyGoal = "Enter a valid weekly goal (hours > 0).";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newSubject = await onSubmit(formData);
      setFormData({
        subjectName: "",
        color: PRESET_COLORS[0],
        description: "",
        weeklyGoal: "",
      });

      setSubjects((prev) => [...prev, newSubject]);
    } catch (error) {
      console.error("Error creating subject:", error);
    } finally {
      onClose && onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div
            className="modal-icon"
            style={{
              background: `linear-gradient(135deg, ${formData.color} 0%, ${formData.color}99 100%)`,
              boxShadow: `0 10px 30px ${formData.color}66`,
            }}
          >
            📚
          </div>
          <div className="modal-title-group">
            <h2 className="gradient-text">Create Subject</h2>
            <p className="text-muted text-small">
              Organize your focus sessions
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Subject Name */}
          <div className="form-group">
            <label htmlFor="subjectName" className="form-label">
              Subject Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="subjectName"
              name="subjectName"
              className={`form-input ${errors.subjectName ? "input-error" : ""}`}
              placeholder="e.g. Mathematics, Physics..."
              value={formData.subjectName}
              onChange={handleChange}
              autoFocus
            />
            {errors.subjectName && (
              <span className="error-msg">{errors.subjectName}</span>
            )}
          </div>

          {/* Color */}
          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker-section">
              <div className="color-swatches">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${formData.color === color && !customColor ? "color-swatch--active" : ""}`}
                    style={{
                      background: color,
                      boxShadow:
                        formData.color === color && !customColor
                          ? `0 0 0 3px rgba(255,255,255,0.15), 0 0 12px ${color}99`
                          : "none",
                    }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
                {/* Custom color picker */}
                <div
                  className="color-swatch color-swatch--custom"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <span className="custom-color-icon">+</span>
                  <input
                    type="color"
                    className="color-input-hidden"
                    value={customColor || formData.color}
                    onChange={handleCustomColor}
                    title="Custom color"
                  />
                </div>
              </div>
              <div className="color-preview">
                <div
                  className="color-preview-dot"
                  style={{ background: formData.color }}
                />
                <span className="color-hex text-muted text-small">
                  {formData.color}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              placeholder="What will you be studying? (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Weekly Goal */}
          <div className="form-group">
            <label htmlFor="weeklyGoal" className="form-label">
              Weekly Goal <span className="required-star">*</span>
            </label>
            <div className="input-with-unit">
              <input
                type="number"
                id="weeklyGoal"
                name="weeklyGoal"
                className={`form-input ${errors.weeklyGoal ? "input-error" : ""}`}
                placeholder="e.g. 10"
                value={formData.weeklyGoal}
                onChange={handleChange}
                min="1"
                max="168"
              />
              <span className="input-unit">sessions/ week</span>
            </div>
            {errors.weeklyGoal && (
              <span className="error-msg">{errors.weeklyGoal}</span>
            )}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary modal-submit-btn">
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
