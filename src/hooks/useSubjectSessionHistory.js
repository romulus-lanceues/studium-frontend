import { useState, useEffect } from "react";
import { getSubjectSessionHistory } from "../api/data";

export default function useSubjectSessionHistory(subjectId, pageSize = 5) {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (subjectId) {
      const fetchHistory = async () => {
        const historyData = await getSubjectSessionHistory(
          subjectId,
          currentPage,
          pageSize,
        );
        setHistory(historyData.content);
        setTotalPages(historyData.totalPages);
      };
      fetchHistory();
    }
  }, [subjectId, currentPage, pageSize]);

  function handleNextPage() {
    setCurrentPage((prev) => {
      if (prev >= totalPages - 1) return prev;
      return prev + 1;
    });
  }

  function handlePreviousPage() {
    setCurrentPage((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }

  return {
    history,
    currentPage,
    totalPages,
    setCurrentPage,
    handleNextPage,
    handlePreviousPage,
  };
}
