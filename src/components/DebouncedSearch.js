/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/https";

const DebouncedSearch = ({ type, resetContactData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchApiData = async (val) => {
    resetContactData();
    try {
      let url = "&page=1&companyId=560";
      if (type === "modalB") {
        url += `&countryId=226`;
      }
      if (val?.trim()) {
        url += `&query=${val}`;
      }
      await fetchData(url);
    } catch (error) {
      console.log("Error while fetching", error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchApiData(searchTerm);
  }, [debouncedSearchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchApiData(searchTerm);
    }
  };

  return (
    <div className="input-group w-50 mb-3 m-auto">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
        </span>
      </div>
      <input
        value={searchTerm}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        type="search"
        className="form-control"
        placeholder="Search..."
      />
    </div>
  );
};

export default React.memo(DebouncedSearch);
