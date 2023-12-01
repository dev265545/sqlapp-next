import React from "react";
import { FiMaximize2, FiMoon, FiMoreHorizontal } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";
import { RiPlayFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";

function Buttons({
  fullscreen,
  themeSelector,
  isFullscreen,
  handleDropDown,
  handleRunSql,
  loading,
  infoModal,
  handleChangeTable,
}) {
  return (
    <>
      {!isFullscreen && (
        <div className={`flex pl-[320px] flex-row gap-5 pb-2`}>
          <button
            onClick={() => {
              fullscreen();
            }}
            className="dark:text-white text-black p-3  hover:text-gray-700 shadow-lg hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="fullscreenButton"
          >
            <FiMaximize2 className="dark:text-white font-bold " />
          </button>
          <button
            onClick={() => {
              themeSelector();
            }}
            className=" p-3 shadow-lg dark:text-white text-black dark:hover:text-white hover:text-gray-700 hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="themeSelectorButton"
          >
            <FiMoon className=" font-bold " />
          </button>
          <button
            onClick={() => {
              handleDropDown();
            }}
            className="p-3 shadow-lg  dark:text-white text-black dark:hover:text-white hover:shadow-cyan-500 hover:shadow-md border rounded-lg hover:text-gray-700"
            id="dropDownButton"
          >
            <FiMoreHorizontal className="  font-bold " />
          </button>
          <button
            onClick={handleRunSql}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:brightness-150"
            id="runSqlButton"
          >
            <RiPlayFill className="inline-block mr-2" />
            Run SQL
          </button>
        </div>
      )}
      {isFullscreen && (
        <div className={`flex pl-[950px] flex-row gap-5 pb-2`}>
          <button
            onClick={() => handleChangeTable()}
            className="dark:text-white text-black p-3  hover:text-gray-700 shadow-lg hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="changeTableButton"
          >
            <FaExchangeAlt className="dark:text-white font-bold " />
          </button>
          <button
            onClick={() => {
              infoModal();
            }}
            className="dark:text-white text-black p-3  hover:text-gray-700 shadow-lg hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="infoModalButton"
          >
            <FaCircleInfo className="dark:text-white font-bold " />
          </button>
          <button
            onClick={fullscreen}
            className="dark:text-white text-black p-3  hover:text-gray-700 shadow-lg hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="fullscreenButtonInFullscreen"
          >
            <FiMaximize2 className="dark:text-white font-bold " />
          </button>
          <button
            onClick={() => {
              themeSelector();
            }}
            className=" p-3 shadow-lg dark:text-white text-black dark:hover:text-white hover:text-gray-700 hover:shadow-cyan-500 hover:shadow-md border rounded-lg"
            id="themeSelectorButtonInFullscreen"
          >
            <FiMoon className=" font-bold " />
          </button>
          <button
            onClick={() => {
              handleDropDown();
            }}
            className="p-3 shadow-lg  dark:text-white text-black dark:hover:text-white hover:shadow-cyan-500 hover:shadow-md border rounded-lg hover:text-gray-700"
            id="dropDownButtonInFullscreen"
          >
            <FiMoreHorizontal className="  font-bold " />
          </button>
          <button
            onClick={handleRunSql}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:brightness-150"
            id="runSqlButtonInFullscreen"
          >
            <RiPlayFill className="inline-block mr-2" />
            Run SQL
          </button>
        </div>
      )}
    </>
  );
}

export default Buttons;
