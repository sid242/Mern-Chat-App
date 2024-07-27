import { Bounce, toast } from "react-toastify";
import { TOAST_POSITION, TOAST_TYPE } from "../constants";

export function isJson(data) {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}

export const getLocalStorage = (key) => {
  const isValidJson = isJson(localStorage.getItem(key));
  if (isValidJson) {
    return JSON.parse(localStorage.getItem(key));
  }
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  let lvalue = value;
  if (typeof value === "object") {
    lvalue = JSON.stringify(value);
  }
  localStorage.setItem(key, lvalue);
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  if (exdays) {
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  }
  let expires = exdays ? "expires=" + d.toUTCString() : "";
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const showToastMessage = (type = "default", message, options) => {
  const toastOptions = {
    position: TOAST_POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    newestOnTop: false,
    ...options,
  };
  if (toastOptions.position?.includes("bottom")) {
    toastOptions.newestOnTop = true;
  }

  switch (type) {
    case TOAST_TYPE.SUCCESS:
      return toast.success(message, toastOptions);
    case TOAST_TYPE.ERROR:
      return toast.error(message, toastOptions);
    case TOAST_TYPE.WARNING:
      return toast.warning(message, toastOptions);
    case TOAST_TYPE.INFO:
      return toast.info(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? `${users[1].firstName} ${users[1].lastName}`
    : `${users[0].firstName} ${users[0].lastName} `;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};
