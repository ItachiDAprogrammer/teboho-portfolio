import React from 'react';
import './VideoModal.css';

const VideoModal = ({ videoUrl, onClose }) => {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={videoUrl}
          title="Expanded Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default VideoModal;