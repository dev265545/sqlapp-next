import React from "react";

function DropDown({ isFullscreen, handleCopyClick, handleClearAll }) {
  return (
    <>
      {!isFullscreen && (
        <div
          id="dropdown"
          className={`z-10 absolute top-28  left-[500px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              onClick={() => {
                handleCopyClick();
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <button className="block px-4 py-2  ">Copy All</button>
            </li>
            <li
              onClick={() => {
                handleClearAll();
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <button className="block px-4 py-2 ">Clear</button>
            </li>
          </ul>
        </div>
      )}
      {isFullscreen && (
        <div
          id="dropdown"
          className={`z-10 absolute top-28  left-[1300px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              onClick={() => {
                handleCopyClick();
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <button className="block px-4 py-2  ">Copy All</button>
            </li>
            <li
              onClick={() => {
                handleClearAll();
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <button className="block px-4 py-2 ">Clear</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default DropDown;
