import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function Modal({ isOpen, onClose, title, url }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-dark-card rounded-xl border border-dark-surface shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-surface bg-dark-bg">
          <h2 className="text-xl font-semibold text-dark-text">{title} - Live Demo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-surface rounded-lg transition-colors text-dark-text-secondary hover:text-dark-text"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="h-full pb-16">
          <iframe
            src={url}
            className="w-full h-full border-0"
            title={`${title} Live Demo`}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-dark-bg border-t border-dark-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-mono">{url}</span>
            </div>
            <button
              onClick={onClose}
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
