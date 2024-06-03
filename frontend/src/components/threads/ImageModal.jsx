import React from 'react';

const ImageModal = ({isOpen, onClose, imageSrc}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="relative">
                <img src={imageSrc} alt="Enlarged view" className="max-w-[600px] max-h-[600px]"/>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white text-black rounded-full p-2 focus:outline-none"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
