import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionHeader = ({
  title,
  subtitle,
  icon,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
            <FontAwesomeIcon 
              icon={icon} 
              className="text-white h-5 w-5" 
            />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;