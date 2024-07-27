import React, { useEffect, useState } from "react";
import SvgIcon from "../../assets/icons/SvgIcon";
import "./index.scss";

const Drawer = ({
  children,
  show,
  close,
  header,
  position = "right",
  className = "",
}) => {
  const isRight = position === "right";

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // Delay to allow CSS transitions to take effect
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 400); // Duration should match your CSS transition duration
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <main
      className={
        "fixed overflow-hidden z-[1000] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isAnimating
          ? "transition-opacity opacity-100 duration-500 translate-x-0 "
          : "transition-all delay-500 opacity-0 " +
            (isRight ? "translate-x-full " : "-translate-x-full ")) +
        className
      }
    >
      <section
        className={
          `w-screen max-w-lg ${isRight ? "right-0" : "left-0"} absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ` +
          (isAnimating
            ? "translate-x-0"
            : isRight
              ? "translate-x-full"
              : "-translate-x-full")
        }
      >
        <article className="relative w-screen max-w-lg pb-5 flex flex-col space-y-6 overflow-y-scroll h-full">
          <span
            className={`fixed top-5 right-5 cursor-pointer z-50`}
            onClick={close}
          >
            <SvgIcon
              iconName="close"
              className="close-icon w-[15px] h-[15px]"
            />
          </span>
          {header && (
            <header className="drawer-header text-2xl font-[600]">
              {header}
            </header>
          )}
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={close}
      ></section>
    </main>
  );
};

export default Drawer;
