import { use_feature } from "./hooks/use_feature";
import Table_MUIX from "./components/Table_MUIX";

const Homepage = () => {
  const {
    cardData,
    setCardData,

    panelData,
    setPanelData,

    inputLotNO,
    setInputLotNO,

    inputOpId,
    setInputOpId,

    inputPanel,
    setInputPanel,

    updateRecord,
    setUpdateRecord,
    loading,
    setLoading,

    error,
    setError,

    handle_update_record,
    isCheckboxChecked,
    setIsCheckboxChecked,

    panelTable,
    setPanelTable,
  } = use_feature();

  const handleCheckboxChange = (checked: boolean) => {
    setIsCheckboxChecked(checked);
  };

  const columns = [{}];

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
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 mt-6"
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          )}
          {cardData && !loading && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📊</span>
                </div>
                <div>
                  <div className="mt-2 text-sm text-gray-500">
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                      {JSON.stringify(cardData, null, 2)}
                    </pre>
                  </div>
                </div>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Sheet NO."
        />
      </div>
      <div>
        <h2>Sheet NO.</h2>
        <Table_MUIX
          datas={panelTable}
          columns={columns}
          not_show_Count={false}
          loading={false}
        />
      </div>

      {/* Checkbox and Button Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              handle_update_record();
            }}
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
