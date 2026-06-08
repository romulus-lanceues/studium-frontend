import { client } from "./client.js";

export const getDashboardData = async () => {
  try {
    const request = await client.get("/api/v1/data/dashboard");
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSessionHistory = async (page, size = 5) => {
  try {
    const request = await client.get("/api/v1/data/session-history", {
      params: {
        page: page,
        size: size,
      },
    });

    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getSubjectPageData = async () => {
  try {
    const request = await client.get("/api/v1/data/subjects-data");
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSubjects = async (pageNumber = 0, pageSize = 6) => {
  try {
    const request = await client.get("/api/v1/subject/subjects", {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getSubjectSessionHistory = async (
  subjectId,
  pageNumber = 0,
  pageSize = 5,
) => {
  try {
    const request = await client.get(`/api/v1/sessions/${subjectId}/history`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlySummary = async (month) => {
  try {
    const request = await client.get(
      "/api/v1/data/analytics/monthly/completed",
      {
        params: {
          month: month,
        },
      },
    );

    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlySubjectDistribution = async (month) => {
  try {
    const request = await client.get(
      "/api/v1/data/analytics/subjects/completed-sessions",
      {
        params: {
          month: month,
        },
      },
    );

    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getWeeklyData = async () => {
  try {
    const request = await client.get("/api/v1/data/week/overview");
    return request.data;
  } catch (error) {
    throw error;
  }
};
