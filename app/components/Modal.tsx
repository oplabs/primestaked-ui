import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { CheckCircle, Close, Spinner } from './Icons'

export function Modal({
  isOpen,
  setIsOpen,
  title,
  txLink,
  status
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  txLink?: string
  title: string
  status: string
}) {
  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-gray-bg1 p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="absolute top-4 right-6 text-grey-500 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Close />
                </button>
                <div className="flex flex-col items-center">
                  <div className="text-red-500 my-8">
                    {status === 'loading' ? (
                      <Spinner size={42} />
                    ) : (
                      <CheckCircle size={42} />
                    )}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 mb-8"
                  >
                    {title}
                  </Dialog.Title>

                  {txLink && (
                    <div className="mb-8">
                      <a
                        href={txLink}
                        rel="noreferrer"
                        target="_blank"
                        className="btn px-6 py-3"
                      >
                        View transaction
                      </a>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
