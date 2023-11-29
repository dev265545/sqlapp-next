// components/DynamicTable.js
import { calculateColumnWidths } from "../utils";

const DynamicTable = ({ data }) => {
  const columnWidths = calculateColumnWidths(data);

  return (
    <div className="table-container dark:text-white border-4 border-gray-500 p-4 rounded-lg shadow-lg overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {Object.keys(columnWidths).map((column, index) => (
              <th
                key={index}
                className="p-2 border border-gray-300"
                style={{ width: `${columnWidths[column]}px` }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(columnWidths).map((column, colIndex) => (
                <td key={colIndex} className="p-2 border border-gray-300">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
