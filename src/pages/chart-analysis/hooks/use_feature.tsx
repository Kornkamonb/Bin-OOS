import axios from "axios";
import { useState, useEffect } from "react";

export const use_feature = () => {
  const [reqRecord, setReqRecord] = useState([]);
  const [reqJob, setReqJob] = useState([]);
  const [reqSummary, setReqSummary] = useState([]);

  const fetchReqRecord = async () => {
    const url =
      "http://127.0.0.1:3000/api/request_analysis/get_req_record_yearV2";
    const params = {
      factory: "A1",
      dept: "PTE",
      from_year: "2024",
      to_year: "2025",
    };
    try {
      const response = await axios.get(url, { params });
      if (response) {
        console.log(response);
        setReqRecord(response.data.data);
      } else {
        setReqRecord([]);
      }
    } catch (error) {
      console.error("Fetch Data request job error:", error);
      return null;
    }
  };

  const fetchReqJob = async () => {
    const url =
      "http://10.17.66.124:8080/api/request_analysis/get_req_job_month";
    const params = {
      factory: "A1",
      dept: "PTE",
      month: "2025-06",
    };
    try {
      const response = await axios.get(url, { params });
      if (response) {
        console.log(response.data.data);
        setReqJob(response.data.data);
      } else {
        setReqJob([]);
      }
    } catch (error) {
      console.error("Fetch Data request job error:", error);
      return null;
    }
  };

  const fetchReqSummary = async () => {
    const url = "http://127.0.0.1:3000/api/request_analysis/get_req_summary";
    const params = {
      factory: "A1",
      dept: "PTE",
      from_year: "2024",
      to_year: "2025",
    };
    try {
      const response = await axios.get(url, { params });
      console.log(response);
      if (response.status === 200) {
        if (response.data.status === "OK") {
          setReqSummary(response.data.data);
        }
      } else {
        setReqSummary([]);
      }
    } catch (error) {
      console.error("Fetch Data request summary error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchReqSummary();
    // fetchReqJob();
    fetchReqRecord();
  }, []);

  return {
    reqSummary,
    reqRecord,
    reqJob,
  };
};
