import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useGetHistoryQuery } from '../../services/history.ts';
import { dateConvertWithTime } from '../../utils/dateConvertWithTime.ts';

interface HistoryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const History: React.FC<HistoryProps> = ({ isOpen, setIsOpen }) => {
  const { data } = useGetHistoryQuery();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div>
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        <div className="bg-indigo-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <a
                            className="cursor-pointer text-sm font-semibold text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </a>
                        </div>
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {data?.map(item => (
                        <ul key={item.id} className="px-4 py-1 list-disc ">
                          <li>
                            <p className="text-sm font-semibold">{item.body}</p>
                            <p className="text-xs text-gray-500">
                              {dateConvertWithTime(item.date)}
                            </p>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default History;
