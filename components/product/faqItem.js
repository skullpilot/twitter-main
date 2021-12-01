import React, { useState } from "react";

export default function FaqItem({ question, answer }) {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className="w-4/5 flex flex-col items-center min-w-0 rounded-xl px-5 py-7 bg-white bg-clip-border border-2 
    border-gray-300 border-solid mx-5 my-7"
    >
      <div
        className="w-full flex flex-row justify-start items-start"
        role="button"
        onClick={() => setExpand((prevExpand) => !prevExpand)}
      >
        <div>{question}</div>
      </div>
      <div style={expand ? {} : { display: "none" }}>
        {
          // 这里原先min-height为1px，tailwind不支持，所以先保留min-h-0
        }
        <div className="flex-auto min-h-0 p-7 text-blue-300">{answer}</div>
      </div>
    </div>
  );
}
