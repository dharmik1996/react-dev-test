import React from "react";

const ModalC = ({ isOpen, handleClose, contactDetails }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      style={{
        display: isOpen ? "block" : "none",
        background: "#0000005c",
        zIndex: 1111
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact Details</h5>
          </div>
          <div className="modal-body text-left">
            <p className="pb-1 mb-1">
              <b>Country Id:</b> {contactDetails?.country_id}
            </p>
            <p className="pb-1 mb-1">
              <b>Email:</b> {contactDetails?.email}
            </p>
            <p className="pb-1 mb-1">
              <b>First Name:</b> {contactDetails?.first_name}
            </p>
            <p className="pb-1 mb-1">
              <b>Phone Number:</b> {contactDetails?.phone_number}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-main btn-c"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModalC);
