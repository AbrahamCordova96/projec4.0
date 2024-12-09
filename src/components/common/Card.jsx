import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ 
  children, 
  title,
  subtitle,
  icon,
  className = '', 
  elevated = false 
}) => {
  return (
    <div className={`
      bg-white rounded-xl 
      ${elevated ? 'shadow-lg' : 'shadow-md'}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {icon && (
              <FontAwesomeIcon 
                icon={icon} 
                className="text-gray-400 h-5 w-5" 
              />
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;