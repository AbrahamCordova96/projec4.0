import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Dropdown = ({ 
  label, 
  items, 
  className = '',
  buttonClassName = '',
  itemsClassName = ''
}) => {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button className={`
        inline-flex justify-center items-center w-full rounded-lg
        bg-white px-4 py-2 text-sm font-medium text-gray-700
        hover:bg-gray-50 focus:outline-none focus:ring-2
        focus:ring-primary-500 focus:ring-offset-2
        ${buttonClassName}
      `}>
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
          absolute right-0 mt-2 w-56 origin-top-right rounded-lg
          bg-white shadow-lg ring-1 ring-black ring-opacity-5
          focus:outline-none z-10
          ${itemsClassName}
        `}>
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`
                      ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                      group flex w-full items-center px-4 py-2 text-sm
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