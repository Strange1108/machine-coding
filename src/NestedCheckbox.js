import React, { useState } from 'react'

const checkBoxesData = [
  {
    "id": 1,
    "name": "Electronics",
    "children": [
      {
        "id": 2,
        "name": "Mobile phones",
        "children": [
          {
            "id": 3,
            "name": "iPhone"
          },
          {
            "id": 4,
            "name": "Android"
          }
        ]
      },
      {
        "id": 5,
        "name": "Laptops",
        "children": [
          {
            "id": 6,
            "name": "MacBook"
          },
          {
            "id": 7,
            "name": "Surface Pro"
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Books",
    "children": [
      {
        "id": 9,
        "name": "Fiction"
      },
      {
        "id": 10,
        "name": "Non-fiction"
      }
    ]
  },
  {
    "id": 11,
    "name": "Toys"
  }
]

const Checkboxes = ({data, checked, setChecked}) => {

  const handleChange = (isChecked, node) => {
    setChecked(prev => {
      const newState = {...prev, [node.id]: isChecked};
      const updateChildren = (node) => {
        node.children?.forEach(child => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      }

      updateChildren(node);

      const verifyChecked = (node) => {
        if(!node.children) return newState[node.id] || false;
        const allChildrenChecked = node.children.every(child => verifyChecked(child));
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      }

      checkBoxesData.forEach(node =>{
        verifyChecked(node);
      })
      return newState;
    })
  }

  return <div>
    {data.map(node => 
    <div  className= "parent" key={node.id}>
      <input type="checkbox" 
        checked={checked[node.id] || false} 
        onChange={e => handleChange(e.target.checked, node)}  
      />
      <span>{node.name}</span>
      {node.children && <Checkboxes data={node.children} checked={checked} setChecked={setChecked}/>}
    </div>)}
  </div>
}

const App = () => {
  const [checked, setChecked] = useState({});
  return (
    <div className='App'>
    <Checkboxes data={checkBoxesData} checked={checked} setChecked={setChecked}/>
    </div>
  )
}
export default App  


// import React, { useState, useEffect, useRef } from 'react';

// const checkBoxesData = [
//   {
//     "id": 1,
//     "name": "Electronics",
//     "children": [
//       {
//         "id": 2,
//         "name": "Mobile phones",
//         "children": [
//           {
//             "id": 3,
//             "name": "iPhone"
//           },
//           {
//             "id": 4,
//             "name": "Android"
//           }
//         ]
//       },
//       {
//         "id": 5,
//         "name": "Laptops",
//         "children": [
//           {
//             "id": 6,
//             "name": "MacBook"
//           },
//           {
//             "id": 7,
//             "name": "Surface Pro"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "id": 8,
//     "name": "Books",
//     "children": [
//       {
//         "id": 9,
//         "name": "Fiction"
//       },
//       {
//         "id": 10,
//         "name": "Non-fiction"
//       }
//     ]
//   },
//   {
//     "id": 11,
//     "name": "Toys"
//   }
// ];

// const CheckboxNode = ({ node, checked, indeterminate, setChecked, level = 0 }) => {
//   const checkboxRef = useRef();
  
//   useEffect(() => {
//     if (checkboxRef.current) {
//       checkboxRef.current.indeterminate = indeterminate[node.id] || false;
//     }
//   }, [indeterminate, node.id]);

//   const handleChange = (isChecked) => {
//     setChecked(prev => {
//       const newChecked = { ...prev };
//       const newIndeterminate = { ...indeterminate };
      
//       // Update this node and all children
//       const updateDescendants = (currentNode, checkedState) => {
//         newChecked[currentNode.id] = checkedState;
//         newIndeterminate[currentNode.id] = false;
        
//         if (currentNode.children) {
//           currentNode.children.forEach(child => {
//             updateDescendants(child, checkedState);
//           });
//         }
//       };
      
//       updateDescendants(node, isChecked);
      
//       // Update parent nodes
//       const updateAncestors = (nodes, targetId) => {
//         for (const currentNode of nodes) {
//           if (currentNode.children) {
//             if (currentNode.children.some(child => child.id === targetId)) {
//               const allChildrenChecked = currentNode.children.every(child => newChecked[child.id]);
//               const someChildrenChecked = currentNode.children.some(child => 
//                 newChecked[child.id] || newIndeterminate[child.id]
//               );
              
//               newChecked[currentNode.id] = allChildrenChecked;
//               newIndeterminate[currentNode.id] = !allChildrenChecked && someChildrenChecked;
              
//               // Continue upward through the tree
//               updateAncestors(checkBoxesData, currentNode.id);
//               break;
//             } else {
//               if (updateAncestors(currentNode.children, targetId)) {
//                 const allChildrenChecked = currentNode.children.every(child => newChecked[child.id]);
//                 const someChildrenChecked = currentNode.children.some(child => 
//                   newChecked[child.id] || newIndeterminate[child.id]
//                 );
                
//                 newChecked[currentNode.id] = allChildrenChecked;
//                 newIndeterminate[currentNode.id] = !allChildrenChecked && someChildrenChecked;
                
//                 updateAncestors(checkBoxesData, currentNode.id);
//                 return true;
//               }
//             }
//           }
//         }
//         return false;
//       };
      
//       if (node.id !== 1 && node.id !== 8 && node.id !== 11) {
//         updateAncestors(checkBoxesData, node.id);
//       }
      
//       return newChecked;
//     });
//   };

//   return (
//     <div className={`flex flex-col ${level > 0 ? 'ml-6' : ''}`}>
//       <div className="flex items-center py-1">
//         <input
//           ref={checkboxRef}
//           type="checkbox"
//           checked={checked[node.id] || false}
//           onChange={(e) => handleChange(e.target.checked)}
//           className="h-4 w-4"
//         />
//         <span className="ml-2">{node.name}</span>
//       </div>
      
//       {node.children && (
//         <div className="ml-2">
//           {node.children.map(childNode => (
//             <CheckboxNode
//               key={childNode.id}
//               node={childNode}
//               checked={checked}
//               indeterminate={indeterminate}
//               setChecked={setChecked}
//               level={level + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const NestedCheckboxes = () => {
//   const [checked, setChecked] = useState({});
//   const [indeterminate, setIndeterminate] = useState({});

//   // Calculate indeterminate states
//   useEffect(() => {
//     const newIndeterminate = { ...indeterminate };
    
//     const processNode = (node) => {
//       if (!node.children) return { checked: checked[node.id] || false, indeterminate: false };
      
//       const childStates = node.children.map(processNode);
//       const allChecked = childStates.every(state => state.checked);
//       const someChecked = childStates.some(state => state.checked || state.indeterminate);
      
//       newIndeterminate[node.id] = !allChecked && someChecked;
//       return { 
//         checked: allChecked, 
//         indeterminate: newIndeterminate[node.id] 
//       };
//     };
    
//     checkBoxesData.forEach(processNode);
//     setIndeterminate(newIndeterminate);
//   }, [checked]);

//   return (
//     <div className="p-4 max-w-md">
//       <h2 className="text-xl font-bold mb-4">Category Selection</h2>
//       {checkBoxesData.map(node => (
//         <CheckboxNode
//           key={node.id}
//           node={node}
//           checked={checked}
//           indeterminate={indeterminate}
//           setChecked={setChecked}
//         />
//       ))}
//     </div>
//   );
// };

// export default NestedCheckboxes;