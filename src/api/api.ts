import axios from "axios";
import { TInsuranceFilter, TUserInfo } from "../common/insurance.type";

export const getInsuranceListAPI = async () => {
  try {
    const response = await axios.get("https://mividhi-insurance.onrender.com/insurance/list");

    return response.data;
  } catch (error) {
    console.error("Error fetching insurance list:", error);
    return null;
  }
};

export const getInsuranceListFilter =async (filter: TInsuranceFilter) => {
  try {
    const response = await axios.post("https://mividhi-insurance.onrender.com/insurance/filter", filter, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching insurance filter:", error);
    return null;
  }
};

export const loginApi =async (userInfo: TUserInfo) => {
  try {
    const response = await axios.post("https://mividhi-insurance.onrender.com/insurance/user", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching insurance filter:", error);
    return null;
  }
};

