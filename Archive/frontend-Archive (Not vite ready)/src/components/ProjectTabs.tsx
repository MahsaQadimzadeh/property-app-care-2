import React, { useState } from "react";

const tabs = ["Details", "Operations", "Invoice OCR", "Community"];

export default function ProjectTabs({ project }) {
  const [active, setActive] = useState("Details");

  return (
    <div className="mt-4">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 font-semibold ${active === tab ? 'border-b-2 border-blue-600' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {active === "Details" && (
          <pre>{JSON.stringify(project, null, 2)}</pre>
        )}
        {active === "Invoice OCR" && (
          <div className="bg-gray-100 p-2 rounded">
            <h3 className="font-semibold">OCR Text</h3>
            <p className="whitespace-pre-wrap">{project.rawText}</p>
          </div>
        )}
        {active === "Community" && <div id="project-thread">(Thread UI placeholder)</div>}
      </div>
    </div>
  );
}
