import "./FullPageLoading.css";

export default function FullPageLoading({ text = "...", show }) {
  if (!show) return null;

  return (
    <div className="fullpage-loading-overlay">
      <div className="fullpage-loading-content">
        <div className="loading-spinner loading-spinner--large">
          <div className="loading-spinner__circle"></div>
          <div className="loading-spinner__inner"></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
}
