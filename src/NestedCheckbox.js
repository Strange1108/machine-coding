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