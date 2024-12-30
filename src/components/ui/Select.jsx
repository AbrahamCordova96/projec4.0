import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  icon: Icon,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, x: -20 } : false}
      animate={animate ? { opacity: 1, x: 0 } : false}
      exit={animate ? { opacity: 0, x: 20 } : false}
      className={`space-y-1 ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className={`
            relative w-full rounded-lg shadow-sm
            pl-3 pr-10 py-2 text-left cursor-default
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          `}>
            {({ value }) => (
              <>
                <span className="block truncate">{value || 'Seleccionar...'}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </>
            )}
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto
              bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60
              ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) => `
                    relative cursor-default select-none py-2 pl-10 pr-4
                    ${active 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                      : 'text-gray-900 dark:text-gray-100'
                    }
                  `}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option}
                      </span>
                      {selected && (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3
                          ${active ? 'text-primary-600' : 'text-primary-600'}`}>
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 dark:text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Select;