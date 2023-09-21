import React from "react";

function DataModalHeader({
  variant,
  handleClose,
  handleUsContactsBtn,
  handleAllContactBtn
}) {
  return (
    <div className="modal-header justify-content-around">
      <button
        type="button"
        className="btn btn-main btn-a"
        disabled={variant === "modalA"}
        onClick={() => handleAllContactBtn()}
      >
        All Contacts
      </button>
      <button
        type="button"
        disabled={variant === "modalB"}
        className="btn btn-main btn-b"
        onClick={() => handleUsContactsBtn()}
      >
        US Contacts
      </button>
      <button
        type="button"
        className="btn btn-main btn-c"
        onClick={() => handleClose()}
      >
        Close
      </button>
    </div>
  );
}

export default DataModalHeader;
