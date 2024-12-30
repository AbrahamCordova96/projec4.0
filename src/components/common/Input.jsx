const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-base font-bold text-gray-800 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            block w-full rounded-md border-gray-300 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            text-base font-medium
            text-base font-medium
            transition-colors duration-200 font-medium
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

export default Input;