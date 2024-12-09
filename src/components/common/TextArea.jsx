import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  rows = 3,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <FontAwesomeIcon icon={icon} className="text-gray-400" />
          </div>
        )}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`
            block w-full rounded-lg border-gray-300 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-colors duration-200
            resize-none
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
            ${props.disabled ? 'bg-gray-50 text-gray-500' : ''}
          `}
          required={required}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;