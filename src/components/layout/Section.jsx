import React from 'react';
import Card from '../common/Card';

const Section = ({ 
  title, 
  children, 
  className = '',
  elevated = false,
  fullWidth = false
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : 'max-w-2xl'} ${className}`}>
      <Card elevated={elevated}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </Card>
    </div>
  );
};

export default Section;