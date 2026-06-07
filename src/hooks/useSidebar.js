import { useState } from "react";

export default function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    console.log("Toggling sidebar");
    setIsSidebarOpen(!isSidebarOpen);
  }

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
  };
}
