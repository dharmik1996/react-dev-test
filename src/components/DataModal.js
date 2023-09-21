import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Scrollbars } from "react-custom-scrollbars";
import DebouncedSearch from "./DebouncedSearch";
import DataModalHeader from "./DataModalHeader";
import {
  makeSelectIsLoading,
  makeSelectIsOnlyEven,
  makeSelectTotalDocs
} from "../redux/selectors";
import { fetchData } from "../utils/https";
import { resetContactData, showOnlyEvens } from "../redux/actions";

const DataModal = ({
  isOpen,
  variant,
  handleClose,
  handleUsContactsBtn,
  handleAllContactBtn,
  contactList,
  showOnlyEvens,
  isOnlyEven,
  handleDetailsModel,
  isLoading,
  totalDocs,
  resetContactData
}) => {
  const [page, setPage] = useState(1);
  const scrollbarsRef = useRef(null);

  const handleCheckboxChange = () => {
    showOnlyEvens(!isOnlyEven);
  };

  const handleScroll = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
      if (page < parseInt(Number(totalDocs) / 10)) {
        let url = "&companyId=560";
        if (variant === "modalB") {
          url += `&countryId=226`;
        }
        setPage(page + 1);
        fetchData(`${url}&page=${page + 1}`);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    scrollbarsRef.current.scrollTop();
  }, [variant]);

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      tabIndex="-11"
      style={{
        display: isOpen ? "block" : "none",
        background: "#0000005c"
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <DataModalHeader
            variant={variant}
            handleClose={handleClose}
            handleUsContactsBtn={handleUsContactsBtn}
            handleAllContactBtn={handleAllContactBtn}
          />

          <div className="modal-body">
            <DebouncedSearch
              handleClose={handleClose}
              type={variant}
              resetContactData={resetContactData}
            />

            <Scrollbars
              ref={scrollbarsRef}
              autoHide
              universal={true}
              autoHeight
              onScrollFrame={handleScroll}
              className="mt-3"
            >
              <div className="text-left px-5">
                {contactList.map((ele, index) => (
                  <div
                    className={`pointer w-50 p-1 list-data ${
                      index === 0 ? "" : "border-top"
                    }`}
                    key={index}
                    onClick={() => handleDetailsModel(ele)}
                  >
                    Phone: {ele?.phone_number}
                  </div>
                ))}
              </div>
              {isLoading ? "Loading..." : null}
            </Scrollbars>
          </div>

          <div className="modal-footer justify-content-start">
            <div className="d-flex justify-content-center align-items-center">
              <input
                type="checkbox"
                checked={isOnlyEven}
                onChange={() => handleCheckboxChange()}
              />
              <label className="m-0 ml-2">Only even</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  totalDocs: makeSelectTotalDocs(),
  isOnlyEven: makeSelectIsOnlyEven()
});

export function mapDispatchToProps(dispatch) {
  return {
    resetContactData: () => dispatch(resetContactData()),
    showOnlyEvens: (data) => dispatch(showOnlyEvens(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DataModal));
