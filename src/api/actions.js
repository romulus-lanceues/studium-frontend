import { client } from "./client";

export const deleteSubject = async (subjectId) => {
  try {
    const request = await client.delete(`/api/v1/subject/delete/${subjectId}`);
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const request = await client.post("/api/v1/subject/add", subjectData);
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubjectCall = async (subjectId, updatedData) => {
  try {
    const request = await client.patch(
      `api/v1/subject/update/${subjectId}`,
      updatedData,
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
