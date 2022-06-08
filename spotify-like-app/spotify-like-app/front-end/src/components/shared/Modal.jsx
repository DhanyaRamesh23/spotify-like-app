import React from "react";
import "../styles/modal.css";

export default function Modal({ children, isOpen, onCloseHandler, name }) {
  if (isOpen) {
    window.onclick = (e) => {
      if (e.target.className === "modal-outer-wrap") {
        onCloseHandler();
      }
    };
  }
  return (
    <section className={`modal ${name} ${isOpen ? "open" : ""}`}>
      <div className="modal-outer-wrap">
        <div className="modal-inner-wrap">{children}</div>
      </div>
    </section>
  );
}
