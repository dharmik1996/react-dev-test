/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setIsLoading,
  showOnlyEvens,
  resetToInitial,
  resetContactData
} from "../redux/actions";
import DataModal from "../components/DataModal";
import {
  makeSelectIsLoading,
  makeSelectAllRawContacts,
  makeSelectIsOnlyEven,
  makeSelectFilteredRawContactsIds
} from "../redux/selectors";
import { fetchData } from "../utils/https";
import ModalC from "../components/ModalC";

function Home({
  showOnlyEvens,
  isLoading,
  allRawContacts,
  filteredRawContactsIds,
  isOnlyEven,
  resetToInitial,
  setIsLoading,
  resetContactData
}) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const filteredContactData =
      filteredRawContactsIds?.map((ele) => {
        const { id, first_name, email, phone_number, country_id } =
          allRawContacts?.[ele];
        return { id, first_name, email, phone_number, country_id };
      }) || [];
    setContactList([...filteredContactData]);
  }, [isOnlyEven, isLoading, filteredRawContactsIds]);

  const handleClose = () => {
    resetToInitial();
    setIsOpen(false);
    setContactDetails({});
    setVariant("");
    window.history.pushState(null, null, "/");
  };

  const handleAllContactBtn = async () => {
    resetContactData();
    setIsOpen(true);
    showOnlyEvens(false);
    setVariant("modalA");
    window.history.pushState(null, null, "/all-contacts");
    try {
      await fetchData(`&companyId=560&page=1`);
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching contacts", error);
    }
  };

  const handleUsContactsBtn = async () => {
    resetContactData();
    showOnlyEvens(false);
    setIsOpen(true);
    setVariant("modalB");
    window.history.pushState(null, null, "/us-contacts");
    try {
      await fetchData(`&companyId=560&countryId=226&page=1`);
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching contacts", error);
    }
  };

  const handleDetailsModel = (val) => {
    setContactDetails(val);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModelClose = () => {
    setContactDetails({});
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {
    window.history.pushState(null, null, "/");
    return () => {
      window.history.pushState(null, null, "/");
    };
  }, []);

  return (
    <div className="container my-app d-flex justify-content-center align-items-center">
      <div className="row text-center">
        <div className="col-12">
          <button
            className="btn btn-main btn-a"
            onClick={() => handleAllContactBtn()}
          >
            Button A
          </button>
          <button
            type="button"
            className="btn ml-5 btn-main btn-b"
            onClick={() => handleUsContactsBtn()}
          >
            Button B
          </button>
          <ModalC
            isOpen={isDetailsModalOpen}
            handleClose={handleDetailsModelClose}
            contactDetails={contactDetails}
          />
          {isOpen && (
            <DataModal
              isOpen={isOpen}
              variant={variant}
              handleClose={handleClose}
              handleAllContactBtn={handleAllContactBtn}
              handleUsContactsBtn={handleUsContactsBtn}
              contactList={contactList}
              handleDetailsModel={handleDetailsModel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  allRawContacts: makeSelectAllRawContacts(),
  filteredRawContactsIds: makeSelectFilteredRawContactsIds(),
  isOnlyEven: makeSelectIsOnlyEven()
});

export function mapDispatchToProps(dispatch) {
  return {
    showOnlyEvens: (data) => dispatch(showOnlyEvens(data)),
    setIsLoading: (data) => dispatch(setIsLoading(data)),
    resetContactData: () => dispatch(resetContactData()),
    resetToInitial: () => dispatch(resetToInitial())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
