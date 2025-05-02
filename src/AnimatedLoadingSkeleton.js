import React, { useState, useEffect } from "react";

function LoadingSkeleton() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="card">
      {loading ? (
        <div className="skeleton-wrapper">
          <div className="skeleton line name"></div>
          <div className="skeleton line bio"></div>
        </div>
      ) : (
        <div className="content">
          <h2>John Doe</h2>
          <p>Full-stack developer at XYZ company</p>
        </div>
      )}
    </div>
  );
}

export default LoadingSkeleton;



// .card {
//     margin: 20px auto;
//     border: 1px solid #ddd;
//     width: 300px;
//     padding: 20px;
//     border-radius: 12px;
//     box-shadow: 2px 10px rgba(0, 0, 0, 0.1);
//     background: white;
//     font-family: sans-serif;
//   }
  
//   .line {
//     height: 16px;
//     border-radius: 8px;
//     margin: 10px 0;
//   }
  
//   .name {
//     width: 60%;
//   }
  
//   .bio {
//     width: 80%;
//   }
  
  
//   .skeleton {
//     background: #eee;
//     position: relative;
//     overflow: hidden;
//   }
  
//   .skeleton::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: -100%;
//     height: 100%;
//     width: 100%;
//     background: linear-gradient(90deg, transparent, #ddd, transparent);
//     animation: shimmer 1.5s infinite linear;
//   }
  
//   @keyframes shimmer {
//     0% {
//       transform: translateX(-100%);
//     }
//     100% {
//       transform: translateX(100%);
//     }
//   }