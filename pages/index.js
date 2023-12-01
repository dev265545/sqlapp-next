import { useRef, useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

// import LeftAlert from "../components/LeftAlert";
// import DynamicTable from "../components/DynamicTable";
// import Buttons from "../components/Buttons";
import React, { lazy, Suspense } from "react";
import Head from "next/head";

const TableModal = lazy(() => import("../components/TableModal"));
const TableInfo = lazy(() => import("../components/TableInfo"));

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
      value: `SELECT * FROM customers
    /* SELECT FROM WHERE GROUP BY HAVING ORDER BY INSERT 
      INTO VALUES UPDATE SET DELETE JOIN INNER LEFT RIGHT OUTER
       ON AS DISTINCT AND OR NOT IN BETWEEN LIKE IS NULL AS COUNT
        AVG SUM MAX MIN DISTINCT INNER JOIN LEFT JOIN RIGHT JOIN FULL
         JOIN WHERE ORDER BY GROUP BY HAVING ASC DESC LIMIT OFFSET; 
         */`,
      json: "customers.json",
    },
    orders: {
      name: "orders.sql",
      language: "sql",
      value: "SELECT * FROM orders",
      json: "orders.json",
    },
    ordersdetails: {
      name: "ordersdetails.sql",
      language: "sql",
      value:
        "Select * from ordersdetails SELECT FROM WHERE GROUP BY HAVING ORDER BY INSERT INTO VALUES UPDATE SET DELETE JOIN INNER LEFT RIGHT OUTER ON AS DISTINCT AND OR NOT IN BETWEEN LIKE IS NULL AS COUNT AVG SUM MAX MIN DISTINCT INNER JOIN LEFT JOIN RIGHT JOIN FULL JOIN WHERE ORDER BY GROUP BY HAVING ASC DESC LIMIT OFFSET;",
      json: "order-details.json",
    },
  };

  const [file, setFile] = useState(files[fileName]);
  const initalData = require("../Tables/" + table);
  const [jsonData, setJsonData] = useState(initalData);
  const [info, setInfo] = useState(false);
  const [selecttable, setSelectTable] = useState(false);
  const handleChangeTable = () => {
    setSelectTable(!selecttable);
  };

  const changeFile = (name) => {
    setFileName(name);
    setFile(files[name]);

    tableChange(files[name].json);
  };
  const tableChange = async (change) => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        // console.log("f", change);
        setTable(change);
        // console.log("dev", change);
        const newData = require("../Tables/" + change);
        setJsonData(newData);
        // console.log(newData);
        resolve();
      }, 1000);
    });

    setLoading(false);
  };
  useEffect(() => {
    // console.log("f");
  }, [jsonData]);

  const infoModal = () => {
    setInfo(!info);
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
    showValue();
    setQuery(editorRef.current.getValue());

    // console.log(query);
    navigator.clipboard.writeText(editorRef.current.getValue());
    // console.log("Copy clicked");
    // setCopyAlert(true);
    setTimeout(() => {
      setQuery(editorRef.current.getValue());
      navigator.clipboard.writeText(editorRef.current.getValue());
      // console.log("Copy clicked");
    }, 100);
  };
  const handleClearAll = () => {
    editorRef.current.setValue("");
    files[fileName].value = "";
  };
  function showValue() {
    if (!editorRef.current) {
      setQuery(editorRef?.current?.getValue());
      // console.log(query);
    }
  }
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Your logic to run every 2 seconds
  //     // For example, you can call your function here
  //     showValue();
  //   }, 200); // 2000 milliseconds = 2 seconds

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // });
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="dark bg-black max-h-screen">
      <Head>
        <title>Atlan-SQLapp</title>
        <meta name="description" content="Atlan Sqlapp" />
      </Head>
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
          <div className="p-2">
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
                  infoModal={infoModal}
                  handleChangeTable={() => handleChangeTable()}
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
                    defaultValue={file.value}
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
                {!isFullscreen ? (
                  <TableInfo
                    dataname={fileName}
                    info={info}
                    infoModal={infoModal}
                  />
                ) : (
                  info && (
                    <TableInfo
                      dataname={fileName}
                      info={info}
                      infoModal={infoModal}
                    />
                  )
                )}
                {isFullscreen && selecttable && (
                  <TableModal
                    files={files}
                    changeFile={changeFile}
                    handleChangeTable={handleChangeTable}
                    fileName={fileName}
                  />
                )}
                {/* {!isFullscreen && <TableInfo dataname={fileName} />} */}
                {!isFullscreen &&
                  Object.keys(files).map((name, index) => (
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
            <div className="p-1 text-white font-bold text-xl ">Output</div>
            {!loading && (
              <DynamicTable data={jsonData} onLoaded={handleTableLoaded} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
