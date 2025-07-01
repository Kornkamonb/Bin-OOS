// hooks/use_feature.ts
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, useCallback } from "react";

const toDDMMYYYY = (d: string) =>
  dayjs(d, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("DD-MM-YYYY");

export const use_feature = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [divData, setDivData] = useState<any[]>([]);

  const [select_dateTo, setSelect_dateTo] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [select_dateFrom, setSelect_dateFrom] = useState<string>(
    dayjs().subtract(60, "day").format("YYYY-MM-DD")
  );

  const [selectedDiv, setSelectedDiv] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosGet = async <T,>(
    url: string,
    params: Record<string, unknown>,
    setter: (data: T) => void
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url, { params });
      setter(data.data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchDistinctDept = useCallback(() => {
    if (!select_dateFrom || !select_dateTo) return;
    axiosGet(
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-day/get-available-departments",
      {
        dateFrom: toDDMMYYYY(select_dateFrom),
        dateTo: toDDMMYYYY(select_dateTo),
      },
      setDeptData
    );
  }, [select_dateFrom, select_dateTo]);

  const fetchDistinctDiv = useCallback(() => {
    if (!selectedDept) return;
    axiosGet(
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-day/get-available-divisions",
      {
        dateFrom: toDDMMYYYY(select_dateFrom),
        dateTo: toDDMMYYYY(select_dateTo),
        mhr_dept: selectedDept,
      },
      setDivData
    );
  }, [select_dateFrom, select_dateTo, selectedDept]);

  const fetchDataTable = useCallback(() => {
    if (!selectedDiv || !selectedDept) return;
    axiosGet(
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-day/get-table",
      {
        dateFrom: toDDMMYYYY(select_dateFrom),
        dateTo: toDDMMYYYY(select_dateTo),
        mhr_div: selectedDiv,
        mhr_dept: selectedDept,
      },
      setTableData
    );
  }, [select_dateFrom, select_dateTo, selectedDiv, selectedDept]);

  useEffect(fetchDistinctDept, [fetchDistinctDept]);

  useEffect(() => {
    setTableData([]);
    setSelectedDept("");
    setSelectedDiv("");
  }, [select_dateTo, select_dateFrom]);

  useEffect(() => {
    if (selectedDept) fetchDistinctDiv();
    else {
      setDivData([]);
      setTableData([]);
      setSelectedDiv("");
    }
  }, [selectedDept, fetchDistinctDiv]);

  useEffect(() => {
    if (!selectedDiv) setTableData([]);
  }, [selectedDiv]);

  return {
    loading,
    error,
    setError,

    selectedDiv,
    setSelectedDiv,
    selectedDept,
    setSelectedDept,

    select_dateFrom,
    setSelect_dateFrom,
    select_dateTo,
    setSelect_dateTo,

    tableData,
    deptData,
    divData,

    fetchDataTable,
  };
};
