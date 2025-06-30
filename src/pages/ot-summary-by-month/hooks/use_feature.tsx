// hooks/use_feature.ts
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, useCallback } from "react";

/** แปลงวันที่ใด ๆ ให้เป็น DD-MM-YYYY (รองรับฟอร์แมทเก่า) */
const toDDMMYYYY = (d: string) =>
  dayjs(d, ["YYYY-MM", "MM-YYYY"]).format("YYYY-MM");

export const use_feature = () => {
  /* ---------- state ---------- */
  const [tableData, setTableData] = useState<any[]>([]);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [divData, setDivData] = useState<any[]>([]);

  const [select_dateTo, setSelect_dateTo] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const [select_dateFrom, setSelect_dateFrom] = useState<string>(
    dayjs().subtract(60, "day").format("YYYY-MM")
  );

  const [selectedDiv, setSelectedDiv] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- helpers ---------- */
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

  /* ---------- fetchers ---------- */
  const fetchDistinctDept = useCallback(() => {
    if (!select_dateFrom || !select_dateTo) return;
    axiosGet(
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-month/get-available-departments",
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
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-month/get-available-divisions",
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
      "http://127.0.0.1:3000/api/nest/smart-ot-summary/smart-ot-summary-by-month/get-table",
      {
        dateFrom: toDDMMYYYY(select_dateFrom),
        dateTo: toDDMMYYYY(select_dateTo),
        mhr_div: selectedDiv,
        mhr_dept: selectedDept,
      },
      setTableData
    );
  }, [select_dateFrom, select_dateTo, selectedDiv, selectedDept]);

  /* ---------- side‑effects ---------- */
  // โหลด department เมื่อวันที่เปลี่ยน
  useEffect(fetchDistinctDept, [fetchDistinctDept]);

  // โหลด division เมื่อ department เปลี่ยน
  useEffect(() => {
    if (selectedDept) fetchDistinctDiv();
    else {
      setDivData([]);
      setTableData([]);
      setSelectedDiv("");
    }
  }, [selectedDept, fetchDistinctDiv]);

  // เคลียร์ตารางถ้า div ถูกรีเซ็ต
  useEffect(() => {
    if (!selectedDiv) setTableData([]);
  }, [selectedDiv]);

  /* ---------- exposed API ---------- */
  return {
    /* loading / error */
    loading,
    error,
    setError,

    /* selections */
    selectedDiv,
    setSelectedDiv,
    selectedDept,
    setSelectedDept,

    /* date pickers */
    select_dateFrom,
    setSelect_dateFrom,
    select_dateTo,
    setSelect_dateTo,

    /* data */
    tableData,
    deptData,
    divData,

    /* actions */
    fetchDataTable,
  };
};
