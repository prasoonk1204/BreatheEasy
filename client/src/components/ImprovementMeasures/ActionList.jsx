import { ActionItem } from "./ActionItem";

export const ActionList = ({ actions, completed, toggle }) => (
  <div className="space-y-3">
    {actions.map((a) => (
      <ActionItem
        key={a.id}
        action={a}
        completed={completed[a.id]}
        onToggle={() => toggle(a.id)}
      />
    ))}
  </div>
);
