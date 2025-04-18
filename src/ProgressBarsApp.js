import React, { useEffect, useState } from 'react'

const ProgessBar = ({progress}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
  
      return () => clearTimeout(timeout);
    }, [progress]);


  return <div className='outer'>
    <div className='inner' 
      style={{
        // width: `${progress}%`, 
        transform: `translateX(${animatedProgress - 100}%)`,
        color: progress <5 ? "black": "white"
      }}
      role='progressbar'
      aria-valuenow={animatedProgress}
      aria-valuemax={100}
      aria-valuemin={0}
    >
      {animatedProgress}
    </div>
  </div>
}

const App = () => {
  const bars = [1, 10, 20, 30, 50, 70, 100]
  return (
    <div>
      <h1 className='text-center'>Progess Bar</h1>
      {bars.map(value => <ProgessBar key = {value} progress={value}/>)}
    </div>
  )
}

export default App



// .outer{
//   margin: 10px 0;
//   border: 1px solid black;
//   border-radius: 10px;
//   overflow: hidden;
//   text-align: center;
// }

// .inner{
//   text-align: center;
//   background-color: green;
//   color: white;
//   padding: 1px;
//   text-align: right;
//   transition: 0.8s ease-in;
// }


// import { useState } from 'react';

// const ProgressBar = () => (
//   <div className="w-full bg-gray-200 h-6 rounded-lg overflow-hidden">
//     <div 
//       className="h-full bg-blue-500 transition-all duration-[2000ms] ease-linear origin-left"
//       style={{
//         animation: 'fillProgress 2000ms linear forwards'
//       }}
//     />
//   </div>
// );

// const ProgressBarsApp = () => {
//   const [bars, setBars] = useState([]);

//   const addBar = () => {
//     setBars(prev => [...prev, Date.now()]);
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 space-y-6">
//       <button 
//         onClick={addBar}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
//       >
//         Add Progress Bar
//       </button>

//       <div className="space-y-4">
//         {bars.map(id => (
//           <ProgressBar key={id} />
//         ))}
//       </div>

//       <style jsx global>{`
//         @keyframes fillProgress {
//           from {
//             transform: scaleX(0);
//           }
//           to {
//             transform: scaleX(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProgressBarsApp;

// import React, { useEffect, useState } from 'react';

// const ProgressBar = ({ Progress }) => {
//   const [animatedProgress, setAnimatedProgress] = useState(0);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setAnimatedProgress(Progress);
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [Progress]);

//   return (
//     <div className="border border-black my-[10px] mx-[2px] rounded-[10px] overflow-hidden">
//       <div
//         className={`bg-green-500 text-right p-1 transition-all ease-in duration-1000 ${
//           Progress < 5 ? 'text-black' : 'text-white'
//         }`}
//         style={{ width: `${animatedProgress}%` }}
//       >
//         {animatedProgress}%
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const bars = [1, 10, 20, 30, 50, 70, 100];
//   return (
//     <div>
//       <h1 className="text-center text-xl font-bold my-4">ProgressBar</h1>
//       {bars.map((value) => (
//         <ProgressBar key={value} Progress={value} />
//       ))}
//     </div>
//   );
// };

// export default App;
