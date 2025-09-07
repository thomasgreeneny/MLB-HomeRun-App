
import React from 'react';
import type { Source } from '../types';

interface SourcesDisplayProps {
  sources: Source[];
}

const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Data Sources</h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          source.web && <li key={index} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a 
              href={source.web.uri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 text-sm"
              aria-label={`Source: ${source.web.title || source.web.uri}`}
            >
              {source.web.title || source.web.uri}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-4">
        Content is provided by AI for informational purposes only and may not be 100% accurate.
      </p>
    </div>
  );
};

export default SourcesDisplay;
