import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Title mappings for paths
const titleMap = {
  "/template-typescript": "Template Typescript",
  "/template-typescript/homepage": "Template Typescript",
};

function Title() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Update title based on the current path
    setTitle(titleMap[location.pathname]);
  }, [location]);

  return <a className="font-semibold  mx-4">{title}</a>;
}

export default Title;
