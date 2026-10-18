import React, { useState } from 'react';
import json from "./data.json";

const List = ({ list, addNodeToList, deleteNodeFromList, isExpanded, toggleExpand }) => {
  return (
    <div style={{ paddingLeft: '20px' }}>
      {list.map((node) => {
        const expanded = isExpanded[node.id];

        return (
          <div key={node.id} style={{ margin: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Expand / Collapse Toggle for Folders */}
              {node.isFolder ? (
                <span
                  onClick={() => toggleExpand(node.id)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    userSelect: 'none',
                    width: '16px',
                    display: 'inline-block',
                    textAlign: 'center'
                  }}
                >
                  {expanded ? "▾" : "▸"}
                </span>
              ) : (
                <span style={{ width: '16px', display: 'inline-block' }} />
              )}

              {/* Icon & Name */}
              <span>{node.isFolder ? "📁" : "📄"}</span>
              <span style={{ fontSize: '15px', color: node.isFolder ? '#111827' : '#4b5563' }}>
                {node.name}
              </span>

              {/* Action Buttons for Folders */}
              {node.isFolder && (
                <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
                  <button
                    onClick={() => addNodeToList(node.id, false)}
                    title="Add File"
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0 2px' }}
                  >
                    +📄
                  </button>
                  <button
                    onClick={() => addNodeToList(node.id, true)}
                    title="Add Folder"
                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0 2px' }}
                  >
                    +📁
                  </button>
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteNodeFromList(node.id)}
                title="Delete"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0 2px', marginLeft: '6px', color: '#ef4444' }}
              >
                🗑️
              </button>
            </div>

            {/* Recursive Children Rendering */}
            {expanded && node.isFolder && (
              node.children && node.children.length > 0 ? (
                <List
                  list={node.children}
                  addNodeToList={addNodeToList}
                  deleteNodeFromList={deleteNodeFromList}
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                />
              ) : (
                <div style={{ paddingLeft: '20px', color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' }}>
                  (empty folder)  
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

const FileExplorer = () => {
  const [data, setData] = useState(json);
  const [isExpanded, setIsExpanded] = useState({});

  const toggleExpand = (folderId) => {
    setIsExpanded((prev) => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const addNodeToList = (parentId, isFolder) => {
    const name = prompt(`Enter ${isFolder ? "folder" : "file"} name: `);
    if (!name || !name.trim()) return;

    const newNode = {
      id: Date.now().toString(),
      name: name.trim(),
      isFolder,
      children: isFolder ? [] : undefined
    };

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode] // Safe spread
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
    // Auto-expand folder so the user sees the newly added child immediately
    setIsExpanded((prev) => ({ ...prev, [parentId]: true }));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return (list || [])
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div style={{ maxWidth: '420px', margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '16px' }}>File / Folder Explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
    </div>
  );
};

export default FileExplorer;
