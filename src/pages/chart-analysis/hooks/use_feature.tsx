import axios from "axios";
import { useState, useEffect } from "react";

export const use_feature = () => {
  const [reqRecord, setReqRecord] = useState([]);
  const [reqJob, setReqJob] = useState([]);

  const fetchReqRecord = async () => {
    const url =
      "http://10.17.66.124:8080/api/request_analysis/get_req_record_year";
    const params = {
      factory: "A1",
      dept: "PTE",
      from_year: "2024",
      to_year: "2025",
    };
    const response = await axios.get(url, { params });
    if (response) {
      console.log(response);
      setReqRecord(response.data);
    } else {
      setReqRecord([]);
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
    const response = await axios.get(url, { params });
    if (response) {
      console.log(response);
      setReqJob(response.data);
    } else {
      setReqJob([]);
    }
  };

  useEffect(() => {
    fetchReqJob();
    fetchReqRecord();
  }, []);

  return {
    reqRecord,
    setReqRecord,
    reqJob,
    setReqJob,
  };
};
