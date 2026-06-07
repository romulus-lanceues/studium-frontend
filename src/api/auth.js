import { client } from "./client.js";

export const login = async (email, password) => {
  try {
    const request = await client.post("/api/v1/auth/login", {
      email,
      password,
    });

    return request;
  } catch (error) {
    if (error.response) {
      return {
        message:
          error.response.data.message ||
          "An error occurred during authentication.",
        status: error.response.status,
      };
    }

    return {
      message: "Unable to connect to the server. Please try again.",
      status: 0,
    };
  }
};

export const signup = async (fullName, email, password) => {
  try {
    const request = await client.post("/api/v1/auth/register", {
      email,
      password,
      fullName,
    });
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const request = await client.post("/api/v1/auth/logout");
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
