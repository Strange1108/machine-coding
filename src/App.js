import React, { useState } from 'react'
import json from "./data.json";

const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className='container'>
      {
        list.map((node) => (
          <div key={node.id}>
            <div className="flex items-center">
              {node.isFolder && (
                <span className="cursor-pointer pr-1 font-bold"
                  onClick={() =>
                    setIsExpanded((prev) => ({
                      ...prev,
                      [node.name]: !prev[node.name],
                    }))
                  }
                >
                  {isExpanded?.[node.name] ? "-" : "+"}
                </span>
              )}
              <span>{node.name}</span>
              {node.isFolder && (<span onClick={() => addNodeToList(node.id)}>
                {<img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s'
                  alt='add'
                  className='w-[20px] ml-[20px]'
                />
                }
              </span>
              )
              }

              {node.isFolder && (<span onClick={() => deleteNodeFromList(node.id)}>
                {<img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GtBsi78JP0ImHJUBHcfVm_JSdw1mrsdyaw&s'
                  alt='delete' className='w-[20px] ml-[20px]'
                />
                }
              </span>
              )
              }
            </div>

            {isExpanded?.[node.name] && node?.children && <List list={node.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>}
          </div>
        ))
      }
    </div>
  )
}

const FileExplorer = () => {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter name: ")
    const updateTree = (list) => {
      return list.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, { id: Date.now().toString(), name: name, isFolder: true, children: [] }]
          }
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list.filter(node => node.id !== itemId).map((node) => {
        if(node.children) {
          return {...node, children: updateTree(node.children)}
        }
        return node;
    });
    }
    setData(prev => updateTree(prev));
  }

  return (
    <div className='App'>
      <h1>File/Folder Explorer</h1>
      <List list={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>
    </div>
  )
}

export default FileExplorer
