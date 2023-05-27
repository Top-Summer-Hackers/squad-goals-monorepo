import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { stringToBytes32 } from "~~/utils/squad-goals/stringToBytes32";

interface MyModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  joinChallenge: (name: string) => Promise<void>;
}

export default function MyModal({ isOpen, setIsOpen, joinChallenge }: MyModalProps) {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function handleJoin() {
    if (name.trim() == "") {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      const bytes32Name = stringToBytes32(name);
      joinChallenge(bytes32Name._hex);
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-priori">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 text-center">
                    Are you sure you want to join this challenge?
                  </Dialog.Title>
                  <div className="mt-6">
                    <p className="text-base text-center text-gray-500">
                      If you don’t completed you will lose your stake!” You are added to the challenge, after sending
                      the ETH amount to stake.
                    </p>
                  </div>

                  <div className="text-xl mt-6 flex justify-center items-center gap-3">
                    <div>
                      <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2">
                          Name
                        </label>
                        <input
                          onChange={e => setName(e.target.value)}
                          type="text"
                          id="name"
                          className="outline outline-1 rounded-lg px-3 py-0.5"
                          placeholder="Enter your name here"
                        />
                      </div>
                    </div>
                  </div>
                  <div onClick={handleJoin} className="flex-center">
                    <button
                      type="button"
                      className="mt-10  text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                      Join
                    </button>
                  </div>
                  <div className="text-center">{isNameValid ? "" : "Please use a valid name"}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
