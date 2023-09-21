import {
  IS_LOADING,
  SET_ALL_CONTACT,
  SHOW_ONLY_EVENS,
  RESET_TO_INITIAL,
  RESET_CONTACT_DATA
} from "../utils/constants";

export function setAllContacts(payload) {
  return {
    type: SET_ALL_CONTACT,
    payload
  };
}

export function showOnlyEvens(payload) {
  return {
    type: SHOW_ONLY_EVENS,
    payload
  };
}

export function setIsLoading(payload) {
  return {
    type: IS_LOADING,
    payload
  };
}

export function resetToInitial() {
  return {
    type: RESET_TO_INITIAL
  };
}

export function resetContactData() {
  return {
    type: RESET_CONTACT_DATA
  };
}
