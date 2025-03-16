import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Move useEffect before any conditional returns
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener when modal opens
    document.addEventListener('keydown', handleEscKey);
    
    // Update body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click on the background overlay
  const handleOverlayClick = (e) => {
    // Only close if the overlay itself was clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Return null if modal is not open, but after hooks are declared
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>This is an example modal dialog content. You can put any React components or HTML content here.</p>
        <div className="mt-4">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExampleUsage;

