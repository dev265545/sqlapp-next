import { data } from "autoprefixer";
import React from "react";
import { FaTableColumns } from "react-icons/fa6";

function TableInfo({ dataname, info, infoModal }) {
  const customers = [
    { columnName: "customerID", dataType: "VARCHAR(10)" },
    { columnName: "companyName", dataType: "VARCHAR(255)" },
    { columnName: "contactName", dataType: "VARCHAR(100)" },
    { columnName: "contactTitle", dataType: "VARCHAR(100)" },
    { columnName: "address", dataType: "VARCHAR(255)" },
    { columnName: "city", dataType: "VARCHAR(100)" },
    { columnName: "region", dataType: "VARCHAR(100)" },
    { columnName: "postalCode", dataType: "INT" },
    { columnName: "country", dataType: "VARCHAR(100)" },
    { columnName: "phone", dataType: "VARCHAR(20)" },
    { columnName: "fax", dataType: "VARCHAR(20)" },
  ];
  const ordersdetails = [
    { columnName: "orderID", dataType: "INT" },
    { columnName: "productID", dataType: "INT" },
    { columnName: "unitPrice", dataType: "DECIMAL(10, 2)" },
    { columnName: "quantity", dataType: "INT" },
    { columnName: "discount", dataType: "DECIMAL(5, 2)" },
  ];
  const orders = [
    { columnName: "orderID", dataType: "INT" },
    { columnName: "customerID", dataType: "VARCHAR(10)" },
    { columnName: "employeeID", dataType: "INT" },
    { columnName: "orderDate", dataType: "DATETIME" },
    { columnName: "requiredDate", dataType: "DATETIME" },
    { columnName: "shippedDate", dataType: "DATETIME" },
    { columnName: "shipVia", dataType: "INT" },
    { columnName: "freight", dataType: "DECIMAL(10, 2)" },
    { columnName: "shipName", dataType: "VARCHAR(255)" },
    { columnName: "shipAddress", dataType: "VARCHAR(255)" },
    { columnName: "shipCity", dataType: "VARCHAR(100)" },
    { columnName: "shipRegion", dataType: "VARCHAR(100)" },
    { columnName: "shipPostalCode", dataType: "INT" },
    { columnName: "shipCountry", dataType: "VARCHAR(100)" },
  ];
  let data = [];
  let heading = "";
  if (dataname === "customers") {
    data = customers;
    heading = "Customers";
  } else if (dataname === "orders") {
    data = orders;
    heading = "Orders";
  } else {
    data = ordersdetails;
    heading = "Order Details";
  }
  return (
    <>
      {!info && (
        <div className="h-full bg-gray-400 dark:bg-gray-700 text-white p-3 shadow-2xl shadow-blue-950 rounded-2xl">
          <div className="p-1 flex flex-row gap-2">
            <FaTableColumns className="font-bold text-2xl text-white" />
            <div className="text-lg font-bold"> {heading} [-]</div>
          </div>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {data.map((customer, index) => (
              <li key={index} className="mb-1 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200  rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
                <time className="mb-1 text-sm leading-none text-black font-bold dark:text-white">
                  {customer.columnName} [{customer.dataType}]
                </time>
              </li>
            ))}
          </ol>
        </div>
      )}
      {info && (
        <div
          onClick={infoModal}
          className="    flex items-center justify-center absolute top-[200px]  left-[600px] "
        >
          <div className="h-full bg-gray-400 dark:bg-gray-700 text-white p-3 shadow-2xl shadow-blue-950 rounded-2xl">
            <div className="p-1 flex flex-row gap-2">
              <FaTableColumns className="font-bold text-2xl text-white" />
              <div className="text-lg font-bold"> {heading} [-]</div>
            </div>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              {data.map((customer, index) => (
                <li key={index} className="mb-1 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200  rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
                  <time className="mb-1 text-sm leading-none text-black font-bold dark:text-white">
                    {customer.columnName} [{customer.dataType}]
                  </time>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

export default TableInfo;
