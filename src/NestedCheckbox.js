import { useState } from "react";
// import './styles.css'; // Uncomment if you have a styles.css file

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      // 1. Recursively update all child nodes downwards
      const updateChildren = (node) => {
        if (node.children) {
          node.children.forEach((child) => {
            newState[child.id] = isChecked;
            updateChildren(child);
          });
        }
      };

      // 2. Recursively find and update all ancestor parents upwards
      const updateParents = (node, data) => {
        const findParent = (nodeId, tree) => {
          for (const item of tree) {
            if (item.children?.some((child) => child.id === nodeId)) {
              return item;
            }
            const found = item.children && findParent(nodeId, item.children);
            if (found) return found;
          }
          return null;
        };

        let parent = findParent(node.id, data);
        while (parent) {
          const allChildrenChecked = parent.children.every(
            (child) => newState[child.id]
          );
          newState[parent.id] = allChildrenChecked;
          parent = findParent(parent.id, data);
        }
      };

      updateChildren(node);
      updateParents(node, CheckboxesData);

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} style={{ paddingLeft: "20px" }}>
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.label}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function NestedCheckbox() {
  const [checked, setChecked] = useState({});

  return (
    <div>
      <h2>Nested Checkbox</h2>
      <Checkboxes
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
