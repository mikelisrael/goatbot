import React, { useState } from "react";
import "./styles/dropdown.css";
import OutsideClickHandler from "react-outside-click-handler";

// const clickOutsideRef = (contentRef, toggleRef) => {
//   document.addEventListener("click", (e) => {
//     // if user clicks toggle
//     if (toggleRef.current && toggleRef.current.contains(e.target)) {
//       contentRef.current.classList.toggle("active");
//     } else {
//       // user clicks outside toggle and content
//       if (contentRef.current && !contentRef.current.contains(e.target)) {
//         contentRef.current.classList.remove("active");
//       }
//     }
//   });
// };

const Dropdown = ({
  icon,
  badge,
  customToggle,
  contentData,
  renderItems,
  renderFooter,
}) => {
  // const dropdownContentRef = useRef(null);
  // const dropdownToggleRef = useRef(null);

  const [dropped, setDropped] = useState(false);

  // clickOutsideRef(dropdownContentRef, dropdownToggleRef);

  return (
    <OutsideClickHandler onOutsideClick={() => setDropped(false)}>
      <div className="dropdown">
        <button
          // ref={dropdownToggleRef}
          onClick={() => setDropped(!dropped)}
          className="dropdown__toggle"
        >
          {icon && <i className={icon}></i>}
          {badge && <span className="dropdown__toggle-badge">{badge}</span>}
          {customToggle && customToggle()}
        </button>
        <div
          //  ref={dropdownContentRef}
          className={`dropdown__content ${dropped && "active"}`}
        >
          {contentData &&
            renderItems &&
            contentData.map((item, index) => renderItems(item, index))}
          {renderFooter && (
            <div className="dropdown__footer">{renderFooter()}</div>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default React.memo(Dropdown);
