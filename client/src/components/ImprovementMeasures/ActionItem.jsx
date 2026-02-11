import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

const ActionItem = ({ action, completed, onToggle }) => (
  <div
    onClick={onToggle}
    className={`p-4 rounded-xl border-2 cursor-pointer ${
      completed ? "bg-emerald-50 border-emerald-500" : "bg-gray-50"
    }`}
  >
    {completed ? <CheckCircle2 /> : <Circle />}
    <span className={completed ? "line-through ml-2" : "ml-2"}>
      {action.text}
    </span>
  </div>
);

export default ActionItem;
