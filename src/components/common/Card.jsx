const Card = ({ 
  children, 
  title,
  subtitle,
  icon: Icon,
  className = '', 
  elevated = false 
}) => {
  return (
    <div className={`
      bg-white rounded-lg 
      ${elevated ? 'shadow-lg' : 'shadow-md'}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {Icon && (
              <Icon className="h-7 w-7 text-gray-700" />
            )}
            <div>
              {title && (
                <h3 className="text-xl font-semibold text-gray-800">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-base text-gray-600 mt-0.5">
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