import { use_feature } from "./hooks/use_feature";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface CardDataItem {
  product_name: string;
  c_oos: number;
}

const Homepage = () => {
  const {
    cardData,

    inputLotNO,
    setInputLotNO,

    inputOpId,
    setInputOpId,

    inputPanel,
    setInputPanel,

    loading,

    isCheckboxChecked,
    setIsCheckboxChecked,

    panelData,

    handleKeyDown,

    handleSmartBinOOSSubmit,
  } = use_feature();

  const handleCheckboxChange = (checked: boolean) => {
    setIsCheckboxChecked(checked);
  };

  const columns: GridColDef[] = [
    { field: "panel_sn", headerName: "Sheet NO", flex: 1, minWidth: 200 },
    { field: "bin", headerName: "Bin", flex: 1 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Text Inputs Section */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-700">Bin OOS Record</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Lot Number
            </label>
            <input
              type="text"
              value={inputLotNO || ""}
              onChange={(e) => setInputLotNO(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Lot Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Operator ID
            </label>
            <input
              type="text"
              value={inputOpId || ""}
              onChange={(e) => setInputOpId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Operator ID"
            />
          </div>
          <div className="flex items-center space-x-3 relative group">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className={`w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 mt-6 ${
                !inputLotNO || !inputOpId
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={!inputLotNO || !inputOpId}
              title={
                !inputLotNO || !inputOpId
                  ? "Please enter Lot Number and Operator ID first"
                  : ""
              }
            />

            <label className="text-xl font-medium text-gray-700 justify-center mt-6">
              Show count OOS
            </label>
          </div>
        </div>
      </div>

      {/* Card Section - Only show when checkbox is checked */}
      {isCheckboxChecked && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Count OOS</h2>
          {loading && (
            <div className="text-center py-4">
              <span className="text-gray-500">Loading card data...</span>
            </div>
          )}
          {cardData && !loading && (
            <div className=" space-x-4 flex">
              <div className="space-y-1">
                {cardData && cardData.length > 0 ? (
                  cardData.map((item: CardDataItem, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-bold text-6xl">
                          🚩
                        </span>
                        <div className="flex flex-col">
                          <div className="text-xl font-semibold text-gray-500">
                            Product Name :{" "}
                            <span className="text-xl font-semibold text-blue-600">
                              {item.product_name}
                            </span>
                          </div>
                          <div className="text-xl font-semibold text-gray-500">
                            Count OOS :{" "}
                            <span className="text-xl font-semibold text-blue-600">
                              {item.c_oos}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">
                    No data available.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Sheet NO.
        </label>
        <input
          type="text"
          value={inputPanel || ""}
          onChange={(e) => setInputPanel(e.target.value)}
          onKeyDown={handleKeyDown} // กด Enter จะเพิ่มข้อมูล
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Sheet NO."
        />
      </div>
      <div>
        <h2>Sheet NO.</h2>
        <DataGrid
          rows={panelData}
          columns={columns}
          // not_show_Count={false}
          loading={false}
          getRowId={(row) => row.id}
        />
      </div>

      {/* Checkbox and Button Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleSmartBinOOSSubmit}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${"bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
