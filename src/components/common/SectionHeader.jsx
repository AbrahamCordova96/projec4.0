import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionHeader = ({
  title,
  subtitle,
  icon,
  className = ''
}) => {
  return (
    <div className="flex items-center border-b-border-gray-300 pB-2 mb4 rounded-lg">
      {icon && (
        <div>
          <FontAwesomeIcon 
            icon={icon} 
            className="t-x-blue-500 text-white h-5 w-5" />
        </div>
      )
      }
      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base font-medium text-gray-600 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;