import "./Loading.css";
export default function Loading({ size = "medium", text = " " }) {
  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-spinner--${size}`}>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__inner"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}
