import { createSelector } from "reselect";
import { initialState } from "./store";

const selectDefaultState = (state) => state || initialState;

const makeSelectAllRawContacts = () =>
  createSelector(selectDefaultState, (appState) => appState.allRawContacts);

const makeSelectAllContactsIds = () =>
  createSelector(selectDefaultState, (appState) => appState.allContactsIds);

const makeSelectFilteredRawContactsIds = () =>
  createSelector(
    selectDefaultState,
    (appState) => appState.filteredRawContactsIds
  );

const makeSelectIsLoading = () =>
  createSelector(selectDefaultState, (appState) => appState.isLoading);

const makeSelectIsOnlyEven = () =>
  createSelector(selectDefaultState, (appState) => appState.isOnlyEven);

const makeSelectTotalDocs = () =>
  createSelector(selectDefaultState, (appState) => appState.totalDocs);

export {
  makeSelectAllRawContacts,
  makeSelectAllContactsIds,
  makeSelectFilteredRawContactsIds,
  makeSelectIsLoading,
  makeSelectIsOnlyEven,
  makeSelectTotalDocs
};
