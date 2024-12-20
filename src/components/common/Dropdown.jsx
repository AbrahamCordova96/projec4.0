// src/components/common/Dropdown.jsx
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Dropdown = ({ 
  label, 
  items, 
  className = '',
  buttonClassName = '',
  itemsClassName = '',
  align = 'right',
  width = 'w-56',
  disabled = false
}) => {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button 
        disabled={disabled}
        className={`
          inline-flex justify-center items-center w-full rounded-lg
          bg-white px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-50 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${buttonClassName}
        `}
      >
        {label}
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`
          absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 ${width}
          origin-top-${align} rounded-lg bg-white shadow-lg ring-1 
          ring-black ring-opacity-5 focus:outline-none z-10
          ${itemsClassName}
        `}>
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`
                      ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                      ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                      group flex w-full items-center px-4 py-2 text-sm
                      ${item.className || ''}
                    `}
                  >
                    {item.icon && (
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;