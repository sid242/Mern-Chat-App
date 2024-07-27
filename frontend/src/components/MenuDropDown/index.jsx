import React, { useEffect, useRef } from "react";
import "./index.scss";

const MenuDropDown = ({
  heading,
  menuItems,
  handleClick,
  position,
  hasDivider = true,
  children,
}) => {
  const dropDownRef = useRef();

  useEffect(() => {
    function checkOutside(e) {
      const element = document.querySelector(".custom-dropdown");
      if (!element?.contains(e?.target)) {
        element?.removeAttribute("open");
      }
    }
    document.addEventListener("click", checkOutside);

    return () => {
      document.removeEventListener("click", checkOutside);
    };
  }, []);

  return (
    <div className="menu-dropdown-container">
      <details className="custom-dropdown" ref={dropDownRef}>
        <summary>{heading}</summary>
        <div
          className={`dropdown-items mt-3 ${position === "top" ? "upside" : "downside"}`}
        >
          {children ?? (
            <ul className="flex flex-col gap-1">
              {menuItems?.map((item, index) => (
                <React.Fragment key={item?.key}>
                  <li
                    className={`dropdown-item dropdown-item-${index + 1} cursor-pointer hover:bg-slate-100 py-2 px-4 rounded`}
                    key={item?.key}
                    onClick={() => {
                      if (handleClick && typeof handleClick === "function") {
                        handleClick(item);
                      }
                      if (dropDownRef && dropDownRef.current) {
                        dropDownRef.current.open = false;
                      }
                    }}
                  >
                    {item?.icon ? (
                      <div className="flex items-center">
                        <span>{item?.icon}</span>
                        <span>{item?.value}</span>
                      </div>
                    ) : (
                      item?.value
                    )}
                  </li>
                  {menuItems?.length - 2 >= index && hasDivider ? <hr /> : null}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </details>
    </div>
  );
};

export default MenuDropDown;
