import React from "react";

function TableModal({ handleChangeTable, files, changeFile, fileName }) {
  return (
    <div className=" fixed top-[100px] left-[500px] ">
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden   z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className=" p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-black">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select one of the below Tables to Work On !
              </h3>
              <button
                onClick={handleChangeTable}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              {Object.keys(files).map((name, index) => (
                <div
                  className="text-white"
                  key={index}
                  onClick={() => changeFile(name)}
                >
                  <button
                    className={`bg-black shadow-lg font-bold text-white rounded-t-xl p-4  ${
                      name === fileName ? "border-b-4 border-blue-400" : ""
                    }`}
                  >
                    {name}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableModal;
