import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PopupModal from "../components/PopupModal";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-5">
      Home
      <div className="flex gap-4 mt-2">
        <Button>
          <Link to="/register">Sign Up</Link>
        </Button>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button onClick={() => setOpen(true)}>Popup</Button>
        <PopupModal open={open} close={() => setOpen(false)}>
          hello
        </PopupModal>
      </div>
    </div>
  );
};

export default Home;
