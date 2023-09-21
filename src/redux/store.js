import { createStore } from "redux";
import {
  IS_LOADING,
  SET_ALL_CONTACT,
  SHOW_ONLY_EVENS,
  RESET_CONTACT_DATA,
  RESET_TO_INITIAL
} from "../utils/constants";

// Initial state
export const initialState = {
  totalDocs: 0,
  allRawContacts: {},
  allContactsIds: [],
  filteredRawContactsIds: [],
  isLoading: false,
  isOnlyEven: false
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CONTACT:
      return {
        ...state,
        allContactsIds: [...state.allContactsIds, ...action.payload?.ids],
        filteredRawContactsIds: [
          ...state.filteredRawContactsIds,
          ...action.payload?.ids
        ],
        allRawContacts: { ...state.allRawContacts, ...action.payload?.data },
        totalDocs: action.payload?.total,
        isLoading: false
      };
    case SHOW_ONLY_EVENS:
      let filteredIds = [];
      if (action.payload) {
        filteredIds = state?.allContactsIds?.filter(
          (number) => number % 2 === 0
        );
      } else {
        filteredIds = state?.allContactsIds;
      }
      return {
        ...state,
        isOnlyEven: action.payload,
        filteredRawContactsIds: filteredIds
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_CONTACT_DATA:
      return {
        totalDocs: 0,
        allRawContacts: {},
        allContactsIds: [],
        filteredRawContactsIds: []
      };
    case RESET_TO_INITIAL:
      return {
        totalDocs: 0,
        allRawContacts: {},
        allContactsIds: [],
        filteredRawContactsIds: [],
        isLoading: false,
        isOnlyEven: false
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
