import store from "../redux/store";
import { setAllContacts, setIsLoading } from "../redux/actions";
import axiosInstance from "./axios-config";

export const fetchData = async (url) => {
  try {
    store.dispatch(setIsLoading(true));
    const response = await axiosInstance.get(
      `contacts.json?noGroupDuplicates=1${url}`
    );
    store.dispatch(
      setAllContacts({
        ids: response?.data?.contacts_ids,
        data: response?.data?.contacts,
        total: response?.data?.total
      })
    );
    return response?.data;
  } catch (error) {
    store.dispatch(setIsLoading(false));
    console.log("Error while fetching data", error);
  }
};
