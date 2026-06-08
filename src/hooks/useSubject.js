import { useState, useEffect } from "react";
import { getSubjectPageData, getUserSubjects } from "../api/data.js";

export default function useSubject(setFullScreenLoading) {
  const [subjects, setSubjects] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalHours, setTotalHours] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSubjectPageData = async () => {
      const data = await getSubjectPageData();
      setTotalSubjects(data.totalSubjects);
      setTotalSessions(data.totalSessions);
      setTotalHours(data.totalHours);
    };

    //Fetch the first page of the user's subjects
    const fetchSubjects = async () => {
      //reconfigure
      const subjects = await getUserSubjects();
      setSubjects(subjects.content);
      setCurrentPage(subjects.pageNumber);
      setTotalPages(subjects.totalPages);
    };

    const loadData = async () => {
      setFullScreenLoading(true);
      await Promise.all([fetchSubjectPageData(), fetchSubjects()]);
      setFullScreenLoading(false);
    };

    loadData();
  }, []);

  //Will take care of fetching new pages of subjects when the user clicks next/previous
  useEffect(() => {
    const fetchSubjects = async () => {
      const subjects = await getUserSubjects(currentPage);
      setSubjects(subjects.content);
      setCurrentPage(subjects.pageNumber);
      setTotalPages(subjects.totalPages);
    };
    fetchSubjects();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev >= totalPages - 1) return prev;
      return prev + 1;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  return {
    subjects,
    setSubjects,
    totalSubjects,
    totalSessions,
    totalHours,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  };
}
