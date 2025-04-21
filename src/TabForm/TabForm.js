// import React, { useState } from 'react'
// import TabForm from './TabForm/TabForm'

// const App = () => {
//   return (
//     <div className='App'>
//       <h1>TabFormComponent</h1>
//       <TabForm />
//     </div>
//   )
// }
// export default App


import React, { useState } from 'react'
import Settings from './Settings';
import Interests from './Interests';
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

    const [errors, setErrors] = useState({})

    const tabs = [{
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if(!data.name || data.name.length<2){
            err.name = "Name is not valid"
        }

        if(!data.age || data.age<18){
            err.age = "Age is not valid"
        }
        
        if(!data.email || data.email<2){
            err.email = "Email is not valid"
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      }
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
          if(data.interests.length <1){
            err.interests = "Select atleast one interests"
          }
        setErrors(err);
        return err.interests ? false : true;
      }
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      }
    },
    ];
  
    const ActiveTabComponent = tabs[activeTab].component;
  
    const handleNextClick = () =>{
      if(tabs[activeTab].validate()){
        setActiveTab((next) => next+1);
      }
    }
    
    const handlePrevClick = () =>{
      if(tabs[activeTab].validate()){
        setActiveTab((prev) => prev-1);
      }
    }

    const handleSubmit = () => {
        //Make API CALL
        console.log(data);
    }
    return (
      <div>
        <div className='heading-container'>
          {tabs.map((t, index) => (
            <div key={index} className='heading' onClick={() => tabs[activeTab].validate() && setActiveTab(index)}>{t.name}</div>
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
