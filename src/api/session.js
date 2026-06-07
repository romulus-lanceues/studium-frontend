import { client } from "./client";

export const createSession = async (subjectId, startSessionRequest) => {
  try {
    const request = await client.post(
      `/api/v1/sessions/${subjectId}/start`,
      startSessionRequest,
    );

    return request.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const completeSession = async (sessionId) => {
  try {
    const request = await client.patch(
      `/api/v1/sessions/${sessionId}/completed`,
    );
    return request.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cancelSession = async (sessionId) => {
  try {
    const request = await client.patch(`/api/v1/sessions/${sessionId}/cancel`);
    if (request.status) return request.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
