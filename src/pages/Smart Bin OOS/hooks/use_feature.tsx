import axios from "axios";
import { useState, useEffect } from "react";

export const use_feature = () => {
  interface PanelItem {
    id: number;
    panel_sn: string;
    bin: string;
  }

  const [cardData, setCardData] = useState<any>([]);
  const [panelData, setPanelData] = useState<PanelItem[]>([]); // ✅ ใช้ชนิดถูกต้อง

  const [inputLotNO, setInputLotNO] = useState<string>("");
  const [inputOpId, setInputOpId] = useState<string>("");
  const [inputPanel, setInputPanel] = useState<string>("");

  const [nextId, setNextId] = useState<number>(1);
  const [updateRecord, setUpdateRecord] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  // ✅ Debug panel list changes
  useEffect(() => {
    console.log("Panel list updated:", panelData);
  }, [panelData]);

  const fetchCardData = async () => {
    const url =
      "http://127.0.0.1:3000/api/nest/smart_bin_oos_record/bin_record/get-card";
    const params = {
      params: {
        lot_no: inputLotNO,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(url, params);
      setCardData(response.data.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchPanelData = async () => {
    if (!inputPanel.trim()) return;

    const url =
      "http://127.0.0.1:3000/api/nest/smart_bin_oos_record/bin_record/get-panel";

    try {
      setLoading(true);
      const response = await axios.get(url, {
        params: { panel_sn: inputPanel },
      });
      console.log("Raw response:", response.data);

      // ✅ ตรวจว่าข้อมูลเป็น array หรือ object
      const apiData = response.data.data;
      const apiRow = Array.isArray(apiData) ? apiData[0] : apiData;

      if (!apiRow?.panel_sn || !apiRow?.bin) {
        console.warn("Missing panel_sn or bin in response:", apiRow);
        return;
      }

      const trimmedName = apiRow.panel_sn.trim();
      const isDuplicate = panelData.some(
        (item) => item.panel_sn === trimmedName
      );

      if (!isDuplicate) {
        const newPanel: PanelItem = {
          id: nextId,
          panel_sn: trimmedName,
          bin: apiRow.bin,
        };
        setPanelData((prev) => [...prev, newPanel]);
        setNextId((prevId) => prevId + 1);
      }

      setInputPanel("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Error fetching panel data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputPanel.trim()) {
      e.preventDefault();
      fetchPanelData();
    }
  };

  const handleSmartBinOOSSubmit = async () => {
    if (panelData.length === 0) {
      setError("No panels added to the list");
      return;
    }

    if (!cardData || cardData.length === 0) {
      setError("No card data available");
      return;
    }

    const lastPanelId = panelData[panelData.length - 1].id;
    const cOosValue = parseInt(cardData[0].c_oos);

    console.log("Last Panel ID:", lastPanelId);
    console.log("Card Data c_oos:", cOosValue);

    if (lastPanelId === cOosValue) {
      try {
        await updatePanelData();
        console.log("Panel data updated successfully - condition met!");
        setError(null);
      } catch (err) {
        console.error("Failed to update panel data:", err);
      }
    } else {
      const errorMsg = `Count Sheet (${lastPanelId}) does not match Count OOS (${cOosValue})`;
      setError(errorMsg);
    }
  };

  const updatePanelData = async () => {
    const url =
      "http://127.0.0.1:3000/api/nest/smart_bin_oos_record/bin_record/post-panel";

    const data = {
      panel_list: panelData.map((item) => item.panel_sn),
      lot_no: inputLotNO,
      op_code: inputOpId,
    };

    try {
      setLoading(true);
      const response = await axios.post(url, data);
      setUpdateRecord(response.data);
      console.log("API Response:", response.data);

      setPanelData([]); // ✅ reset panelData อย่างถูกต้อง
      setNextId(1);
    } catch (err: any) {
      setUpdateRecord([]);
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputLotNO !== "" && isCheckboxChecked) {
      fetchCardData();
    }
  }, [isCheckboxChecked]);

  return {
    cardData,
    setCardData,

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

    isCheckboxChecked,
    setIsCheckboxChecked,

    panelData,

    handleKeyDown,
    handleSmartBinOOSSubmit,
  };
};
