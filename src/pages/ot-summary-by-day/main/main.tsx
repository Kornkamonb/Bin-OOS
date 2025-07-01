import { use_feature } from "../hooks/use_feature";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MyAutocomplete from "../components/MyAutocomplete";
import dayjs from "dayjs";

const Homepage = () => {
  const {
    selectedDiv,
    setSelectedDiv,

    selectedDept,
    setSelectedDept,

    tableData,

    fetchDataTable,

    deptData,
    divData,

    select_dateTo,
    setSelect_dateTo,
    select_dateFrom,
    setSelect_dateFrom,
  } = use_feature();

  const tableDatawithID = tableData.map((row, index) => ({
    ...row,
    id:
      row.dlh_employee_id && row.dlh_effective_date_time
        ? `${row.dlh_employee_id}-${row.dlh_effective_date_time}-${index}`
        : `fallback-${index}`,
  }));

  const columns: GridColDef[] = [
    {
      field: "dlh_employee_id",
      headerName: "Employee ID",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dlh_employee_eng",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 250,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "job_group",
      headerName: "Job Group",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "job_grade",
      headerName: "Job Grade",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mhr_div",
      headerName: "Division",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mhr_dept",
      headerName: "Department",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dlh_cc",
      headerName: "Cost Center",
      flex: 1,
      minWidth: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ot_judge",
      headerName: "OT Judge",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ot_status",
      headerName: "OT Status",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dlh_effective_date_time",
      headerName: "Effective Date Time",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "dlh_clocking_date_from",
      headerName: "Clocking From",
      flex: 1,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "dlh_clocking_date_to",
      headerName: "Clocking To",
      flex: 1,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "calendar",
      headerName: "Calendar",
      flex: 1,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "dlh_normal_hour",
      headerName: "Normal Hours",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "dlh_bracked_ot",
      headerName: "Bracket OT",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "request_ot",
      headerName: "Request OT",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Text Inputs Section */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-700">
          OT Summary By Day
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Date From
            </label>
            <input
              type="date"
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              onChange={(e) => setSelect_dateFrom(e.target.value)}
              value={select_dateFrom}
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Date To
            </label>
            <input
              type="date"
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              onChange={(e) => setSelect_dateTo(e.target.value)}
              value={select_dateTo}
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Department
            </label>
            <MyAutocomplete
              modalData={deptData}
              selectValue={selectedDept}
              setSelectValue={setSelectedDept}
              uniqueKey="mhr_dept"
              label="Select Department"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Division
            </label>
            <MyAutocomplete
              modalData={divData}
              selectValue={selectedDiv}
              setSelectValue={setSelectedDiv}
              uniqueKey="mhr_div"
              label="Select Division"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={fetchDataTable}
            className={`px-8 py-3 rounded-md font-medium transition-colors ${
              !selectedDiv || !selectedDept
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={!selectedDiv || !selectedDept}
            title={
              !selectedDiv || !selectedDept ? "Please select Div and Dept" : ""
            }
          >
            SEARCH DATA
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div></div>
      <div>
        <DataGrid
          rows={tableDatawithID}
          columns={columns}
          loading={false}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
};

export default Homepage;
