import React from 'react';
import { createPortal } from 'react-dom';
 const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null; 

    return createPortal(
        <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose} // Close modal on overlay click
    >
        <div 
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-100
                flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
            <h2 className="text-xl font-semibold mb-2 text-[#215b62]">ERROR</h2>
            <p className="text-red-700 text-center">{message}</p>
            <button
                className="mt-4 bg-[#6A8D92] text-white px-6 py-1 rounded-full 
                    hover:bg-[#D86D25] focus:outline-none focus:ring-2 focus:ring-red-300 
                    transition duration-200 transform hover:scale-105"
                    onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>,
    document.getElementById('modal-root')
    
    );
};
export default Modal;