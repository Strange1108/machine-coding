// import React, { useEffect } from 'react';
// import { X } from 'lucide-react';
// import './ModelDialouge.css';

// const Modal = ({ isOpen, onClose, title, children }) => {
//   // Move useEffect before any conditional returns
//   useEffect(() => {
//     const handleEscKey = (e) => {
//       if (isOpen && e.key === 'Escape') {
//         onClose();
//       }
//     };

//     // Add event listener when modal opens
//     document.addEventListener('keydown', handleEscKey);

//     // Update body scroll
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup function
//     return () => {
//       document.removeEventListener('keydown', handleEscKey);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   // Handle click on the background overlay
//   const handleOverlayClick = (e) => {
//     // Only close if the overlay itself was clicked
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // Return null if modal is not open, but after hooks are declared
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="modal-overlay"
//       onClick={handleOverlayClick}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="modal-container">
//         {/* Header */}
//         <div className="modal-header">
//           <h2 className="modal-title">{title}</h2>
//           <button
//             onClick={onClose}
//             className="modal-close-btn"
//             aria-label="Close modal"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="modal-body">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example usage component
// const ExampleUsage = () => {
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   return (
//     <div className="modal-demo-container">
//       <button 
//         onClick={() => setIsModalOpen(true)}
//         className="btn btn-primary"
//       >
//         Open Modal
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Example Modal"
//       >
//         <p>This is an example modal dialog content. You can put any React components or HTML content here.</p>
//         <div className="modal-actions">
//           <button 
//             onClick={() => setIsModalOpen(false)}
//             className="btn btn-secondary"
//           >
//             Close Modal
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export { Modal };
// export default ExampleUsage;





import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Modal Dialog</h2>
            <p>This is a modal popup.</p>

            <button onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
