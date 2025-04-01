import React, { useState } from 'react'
import Settings from './Settings';
import Interests from './TabForm/Interests';
import Profile from './Profile';


const TabForm = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState({
        name:"Akshay",
        age:"29",
        email:"Akshay29@gmail.com",
        interests: ["coding", "music"],
        theme: "dark",
    });

    const [errors, setErrors] = useState({ })

    const tabs = [{
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if(!data.name || data.name<2){
            err.name = "Name is not valid"
        }

        if(!data.name || data.name<2){
            err.name = "Name is not valid"
        }
        
        if(!data.name || data.name<2){
            err.name = "Name is not valid"
        }
      }
    },
    {
      name: "Interests",
      component: Interests
    },
    {
      name: "Settings",
      component: Settings
    },
    ];
  
    const ActiveTabComponent = tabs[activeTab].component;
  
    const handleNextClick = () =>{
        setActiveTab((prev) => prev+1);
    }
    
    const handlePrevClick = () =>{
        setActiveTab((prev) => prev-1);
    }

    const handleSubmit = () => {
        //Make API CALL
        console.log(data);
    }
    return (
      <div>
        <div className='heading-container'>
          {tabs.map((t, index) => (
            <div key={index} className='heading' onClick={() => setActiveTab(index)}>{t.name}</div>
          ))}
        </div>
        <div className='tab-body'>
          <ActiveTabComponent data={data} setData={setData} errors={errors}/>
        </div>
        <div className='flex item-center justify-center gap-2'>
            {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
            {activeTab < tabs.length-1 && <button onClick={handleNextClick}>Next</button>}
            {activeTab === tabs.length-1 && <button onClick={handleSubmit}>Submit</button>}
        </div>

      </div>
    )
}

export default TabForm
