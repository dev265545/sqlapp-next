import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";

import LeftAlert from "../components/LeftAlert";
import DynamicTable from "../components/DynamicTable";
import Buttons from "../components/Buttons";

export default function Home() {
  const editorRef = useRef(null);
  const [query, setQuery] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const [copyalert, setCopyAlert] = useState(false);
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(40);
  const [lw, setLW] = useState(320);
  const [leftD, setLeftD] = useState(500);
  const [themeset, setThemeset] = useState("vs-dark");
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState("orders.json");
  const tableChange = async (change) => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        setTable(change);
        resolve();
      }, 1000);
    });

    setLoading(false);
  };

  const handleRunSql = async () => {
    setLoading(true);
    setQuery(editorRef.current.getValue());

    // Simulate an asynchronous SQL execution
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // After execution, you can perform additional actions if needed
    console.log("SQL query executed successfully!");

    // Reset loading state after completion
    setLoading(false);
    setTableLoading(true);
  };

  const handleTableLoaded = () => {
    setTableLoading(false);
  };
  const fullscreen = () => {
    if (width == 90) {
      setWidth(190);
      setLW(1070);
      setLeftD(1300);
    } else {
      setWidth(90);
      setLW(320);
      setLeftD(500);
    }
  };
  const themeSelector = () => {
    if (themeset == "light") {
      setThemeset("vs-dark");
    } else {
      setThemeset("light");
    }
  };
  const handleDropDown = () => {
    setDropDown(!dropdown);
  };
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  const handleCopyClick = () => {
    setQuery(editorRef.current.getValue());
    console.log(query);
    navigator.clipboard.writeText(query);
    console.log("Copy clicked");
    setCopyAlert(true);
    setTimeout(() => {
      setCopyAlert(false);
    }, 3000);
  };
  const handleClearAll = () => {
    editorRef.current.setValue("");
  };
  function showValue() {
    setQuery(editorRef.current.getValue());
  }
  const jsonData = require("../Tables/" + table);
  return (
    <div className="">
      <div className="flex flex-col bg-gray-300 dark:bg-black h-screen">
        {copyalert && <LeftAlert />}
        <nav>
          <Navbar />
        </nav>
        <div className="p-1">
          <div className=" w-full flex-col  ">
            <div className="flex items-end space-x-2 ">
              <div className=" bg-black shadow-lg  rounded-t-xl w-20 p-3 ">
                <div className="text-bold text-white font-serif">Input</div>
              </div>
              <Buttons
                handleDropDown={handleDropDown}
                lw={lw}
                handleRunSql={() => tableChange("customers.json")}
                fullscreen={fullscreen}
                themeSelector={themeSelector}
                loading={loading}
              />
            </div>

            <div className={`flex p-4 shadow-black`}>
              {/* Editor */}
              <Editor
                height={height + "vh"} // Adjust height to accommodate buttons
                width={width + "vh"}
                defaultLanguage="sql"
                theme={themeset}
                defaultValue="// Write Your SQL Queries Here"
                onMount={handleEditorDidMount}
                onChange={() => {
                  showValue();
                }}
                options={{ readOnly: loading }} // Disable editor during loading
                className={
                  loading
                    ? "opacity-50"
                    : "shadow-2xl shadow-black border-black  border-8 "
                }
              />
              {/* Buttons */}
            </div>
          </div>
        </div>

        {dropdown && (
          <div
            id="dropdown"
            class={`z-10 absolute top-28  left-[${leftD}px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black`}
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li
                onClick={() => {
                  handleCopyClick();
                }}
                className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <button class="block px-4 py-2  ">Copy All</button>
              </li>
              <li
                onClick={() => {
                  handleClearAll();
                }}
                className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <button class="block px-4 py-2 ">Clear</button>
              </li>
            </ul>
          </div>
        )}
        <div className="container mx-auto p-4">
          {loading && (
            <div className="flex items-center justify-center p-20">
              {" "}
              <div
                class="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-cyan-500 border-t-transparent shadow-md"
              ></div>
            </div>
          )}
          {!loading && (
            <DynamicTable data={jsonData} onLoaded={handleTableLoaded} />
          )}
        </div>
      </div>
    </div>
  );
}
