import { useState } from "react";
import { useAQIData } from "./hooks/useAQIData";
import { useActions } from "./hooks/useActions";
import ActionList from "./components/ActionList";

const ImprovementMeasures = () => {
  const { aqiData, completedActions, toggleAction } = useAQIData();
  const [activeCategory, setActiveCategory] = useState("all");

  if (!aqiData) return <p>Loading...</p>;

  const actions = useActions(aqiData.aqi, aqiData.dominentpol);
  const allActions = [...actions.personal, ...actions.community, ...actions.policy];

  const filtered =
    activeCategory === "all" ? allActions : actions[activeCategory];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ActionList
        actions={filtered}
        completed={completedActions}
        toggle={toggleAction}
      />
    </div>
  );
};

export default ImprovementMeasures;