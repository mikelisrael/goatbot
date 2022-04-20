import { useRef } from "react";
import "./styles/dropdown.css";

const clickOutsideRef = (contentRef, toggleRef) => {
  document.addEventListener("mousedown", (e) => {
    // if user clicks toggle
    if (toggleRef.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle("active");
    } else {
      // user clicks outside toggle and content
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove("active");
      }
    }
  });
};

const Dropdown = ({
  icon,
  badge,
  customToggle,
  contentData,
  renderItems,
  renderFooter,
}) => {
  const dropdownContentRef = useRef(null);
  const dropdownToggleRef = useRef(null);

  clickOutsideRef(dropdownContentRef, dropdownToggleRef);

  return (
    <div className="dropdown">
      <button ref={dropdownToggleRef} className="dropdown__toggle">
        {icon && <i className={icon}></i>}
        {badge && <span className="dropdown__toggle-badge">{badge}</span>}
        {customToggle && customToggle()}
      </button>
      <div ref={dropdownContentRef} className="dropdown__content">
        {contentData &&
          renderItems &&
          contentData.map((item, index) => renderItems(item, index))}
        {renderFooter && (
          <div className="dropdown__footer">{renderFooter()}</div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
