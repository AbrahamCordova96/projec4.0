import { Switch as HeadlessSwitch } from '@headlessui/react';

const Switch = ({ enabled, onChange, label = '', className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <HeadlessSwitch
        checked={enabled}
        onChange={onChange}
        className={`
          ${enabled ? 'bg-primary-600' : 'bg-gray-200'}
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer
          rounded-full border-2 border-transparent transition-colors
          duration-200 ease-in-out focus:outline-none focus:ring-2
          focus:ring-primary-500 focus:ring-offset-2
        `}
      >
        <span
          className={`
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none relative inline-block h-5 w-5
            transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
          `}
        />
      </HeadlessSwitch>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>
      )}
    </div>
  );
};

export default Switch;