import { useRef, useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

// import LeftAlert from "../components/LeftAlert";
// import DynamicTable from "../components/DynamicTable";
// import Buttons from "../components/Buttons";
import React, { lazy, Suspense } from "react";
const TableInfo = lazy(() => import("../components/TableInfo"));
const DropDown = lazy(() => import("../components/DropDown"));

// Lazy-loaded components
const Editor = lazy(() => import("@monaco-editor/react"));

const Navbar = lazy(() => import("../components/Navbar"));
const LeftAlert = lazy(() => import("../components/LeftAlert"));
const DynamicTable = lazy(() => import("../components/DynamicTable"));
const Buttons = lazy(() => import("../components/Buttons"));

export default function Home() {
  const editorRef = useRef(null);
  const [query, setQuery] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const [copyalert, setCopyAlert] = useState(false);
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(40);
  const [themeset, setThemeset] = useState("vs-dark");
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState("customers.json");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fileName, setFileName] = useState("customers");
  const filenamdata = ["customers", "orders", "ordersdetails"];
  const files = {
    customers: {
      name: "customers.sql",
      language: "sql",
      value: "customers.json",
      json: "customers.json",
    },
    orders: {
      name: "orders.sql",
      language: "sql",
      value: "orders.json",
      json: "orders.json",
    },
    ordersdetails: {
      name: "ordersdetails.sql",
      language: "sql",
      value: "Some sql string details",
      json: "order-details.json",
    },
  };

  const [file, setFile] = useState(files[fileName]);
  const initalData = require("../Tables/" + table);
  const [jsonData, setJsonData] = useState(initalData);

  console.log(file);
  console.log(fileName);
  const changeFile = (name) => {
    console.log("name", name);
    setFileName(name);
    console.log("filename---", files[name]);
    setFile(files[name]);
    console.log(file.json, "json");
    tableChange(files[name].json);
  };
  const tableChange = async (change) => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("f", change);
        setTable(change);
        console.log("dev", change);
        const newData = require("../Tables/" + change);
        setJsonData(newData);
        console.log(newData);
        resolve();
      }, 1000);
    });

    setLoading(false);
  };
  useEffect(() => {
    console.log("f");
  }, [jsonData]);

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
    if (width === 90) {
      setWidth(190);
      setIsFullscreen(true); // Set fullscreen state to true
    } else {
      setWidth(90);
      setIsFullscreen(false); // Set fullscreen state to false
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
  const [initialLoading, setInitialLoading] = useState(true);

  // ... (other state variables)

  useEffect(() => {
    // Simulate initial loading delay (you can replace this with your actual data fetching logic)
    const timeoutId = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // Adjust the timeout as needed

    // Clean up the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="dark bg-black max-h-screen">
      {initialLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-cyan-500 border-t-transparent shadow-md"></div>
        </div>
      )}
      {!initialLoading && (
        <div className="flex flex-col bg-gray-300 dark:bg-black max-h-full ">
          {copyalert && <LeftAlert />}
          <nav>
            <Navbar />
          </nav>
          <div className="p-1">
            <div className=" w-full flex-col  ">
              <div className="flex items-end space-x-2 ">
                <div className=" bg-black shadow-lg  rounded-t-xl w-20 p-3 flex flex-row gap-3 ">
                  <button
                    className={`bg-black shadow-lg font-bold text-white rounded-t-xl  
                    `}
                  >
                    Input
                  </button>
                </div>
                <Buttons
                  handleDropDown={handleDropDown}
                  handleRunSql={() => tableChange("customers.json")}
                  fullscreen={fullscreen}
                  themeSelector={themeSelector}
                  loading={loading}
                  isFullscreen={isFullscreen}
                />
              </div>
              <div className="flex flex-row">
                <div className={`flex p-4 shadow-black`}>
                  {/* Editor */}
                  <Editor
                    height={height + "vh"} // Adjust height to accommodate buttons
                    width={width + "vh"}
                    defaultLanguage="sql"
                    language={file.language}
                    theme={themeset}
                    path={file.name}
                    loading={
                      <div className="flex items-center justify-center h-screen">
                        <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-cyan-500 border-t-transparent shadow-md"></div>
                      </div>
                    }
                    value={file.value}
                    onMount={handleEditorDidMount}
                    onChange={() => {
                      showValue();
                    }}
                    options={{ readOnly: loading }} // Disable editor during loading
                    className={
                      loading
                        ? "opacity-50 shadow-2xl shadow-black border-black  border-8"
                        : "shadow-2xl shadow-black border-black  border-8 "
                    }
                  />
                  {/* Buttons */}
                </div>
                {!isFullscreen && <TableInfo dataname={fileName} />}
                {Object.keys(files).map((name, index) => (
                  <div
                    className="text-white"
                    key={index}
                    onClick={() => changeFile(name)}
                  >
                    <button
                      className={`bg-black shadow-lg font-bold text-white rounded-t-xl p-4 border dark:border-white ${
                        name === fileName
                          ? "border-b-4 border-cyan-500"
                          : "font-bold text-white"
                      }`}
                    >
                      {name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {dropdown && !isFullscreen && (
            <div
              id="dropdown"
              class={`z-10 absolute top-28  left-[500px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black`}
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
          {dropdown && isFullscreen && (
            <div
              id="dropdown"
              class={`z-10 absolute top-28  left-[1300px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black`}
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
      )}
    </div>
  );
}
