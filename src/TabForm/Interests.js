import React from 'react'

const Interests = ({data, setData, errors}) => {
    const {interests} = data;

    const handleDataChange = (e) => {
        setData((prevState) => ({...prevState, 
            interests:  e.target.checked ?
            [...prevState.interests, e.target.name] : 
            prevState.interests.filter((i) => i !== e.target.name)}));
    }
  return (
    <div>
      <div>
        <label> <input type='checkbox' name='coding' checked={interests.includes("coding")} onChange={handleDataChange}/> Coding </label>
      </div>
      <div>
        <label> <input type='checkbox' name='music' checked={interests.includes("music")} onChange={handleDataChange}/> Music </label>
      </div>
      <div>
        <label> <input type='checkbox' name='javascript' checked={interests.includes("javascript")} onChange={handleDataChange}/> Javascript </label>
      </div>
      {errors.interests && <span className='error'>{errors.interests}</span>}
    </div>
  )
}

export default Interests
