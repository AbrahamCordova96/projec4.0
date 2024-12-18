const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  required = false,
  rows = 3,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-base font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500" />
          </div>
        )}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`
            block w-full rounded-md border-gray-300 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200 font-medium
            resize-none
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
            ${props.disabled ? 'bg-gray-50 text-gray-500' : ''}
          `}
          required={required}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;