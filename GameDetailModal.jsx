import { useState } from "react";

const GameDetailModal = ({ game, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#1f2937',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1rem' }}>
          {game.name}
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
          Current Players: {game.current?.toLocaleString() || 'N/A'}
        </p>
        <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
          Peak: {game.peak?.toLocaleString() || 'N/A'}
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Genre:</strong> FPS | <strong>Developer:</strong> Valve
        </div>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/d-7o9xYp7eE?autoplay=1"
          title="CS2 Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameDetailModal;