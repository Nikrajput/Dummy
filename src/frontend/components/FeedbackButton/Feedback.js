import React from "react";
import "./Feedback.css";
import Modal from "react-modal";
// import ContactForm from "../../../backend/contactForm/contactForm";
Modal.setAppElement("#root");
const Feedback = ({setModalIsOpen}) => {
  
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalIsOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>

  );
};

export default Feedback;
