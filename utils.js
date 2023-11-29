// utils.js
export const calculateColumnWidths = (data) => {
  const columnWidths = {};
  for (const row of data) {
    for (const [key, value] of Object.entries(row)) {
      const contentWidth = String(value).length * 8; // Adjust the multiplier based on your needs
      columnWidths[key] = Math.max(columnWidths[key] || 0, contentWidth);
    }
  }
  return columnWidths;
};
