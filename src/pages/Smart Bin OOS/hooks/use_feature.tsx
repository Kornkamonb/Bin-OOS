import axios from "axios";
import { useState, useEffect } from "react";

export const use_feature = () => {
  interface PanelItem {
    id: number;
    name: string;
  }

  const [cardData, setCardData] = useState<any>([]);
  const [panelData, setPanelData] = useState<any>([]);

  const [inputLotNO, setInputLotNO] = useState<string>("");
  const [inputOpId, setInputOpId] = useState<string>("");
  const [inputPanel, setInputPanel] = useState<string>("");

  const [panelList, setPanelList] = useState<PanelItem[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const [updateRecord, setUpdateRecord] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const handleAddPanel = () => {
    if (inputPanel.trim() === "") return;

    const newPanel: PanelItem = {
      id: nextId,
      name: inputPanel.trim(),
    };

    setPanelList((prev) => [...prev, newPanel]);
    setNextId((id) => id + 1);
    setInputPanel(""); // Clear input
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddPanel();
    }
  };

  // Updated function to handle button click with condition check
  const handleSmartBinOOSSubmit = async () => {
    if (panelList.length === 0) {
      setError("No panels added to the list");
      return;
    }

    if (!cardData || cardData.length === 0) {
      setError("No card data available");
      return;
    }

    // Get the last panel ID from panelList
    const lastPanelId = panelList[panelList.length - 1].id;

    // Get c_oos from the first item in cardData array and convert to number
    const cOosValue = parseInt(cardData[0].c_oos);

    console.log("Last Panel ID:", lastPanelId);
    console.log("Card Data c_oos:", cOosValue);
    console.log("Card Data:", cardData[0]);

    // Check if last panel ID matches cardData[0].c_oos
    if (lastPanelId === cOosValue) {
      try {
        await updatePanelData();
        console.log("Panel data updated successfully - condition met!");
        // Clear error if API call is successful
        setError(null);
      } catch (err) {
        console.error("Failed to update panel data:", err);
      }
    } else {
      const errorMsg = `Last panel ID (${lastPanelId}) does not match cardData.c_oos (${cOosValue})`;
      setError(errorMsg);
      console.log("Condition not met - API not called");
      console.log(`Expected: ${cOosValue}, Got: ${lastPanelId}`);
    }
  };

  const updatePanelData = async () => {
    const url =
      "http://127.0.0.1:3000/api/nest/smart_bin_oos_record/bin_record/post-panel";

    const data = {
      panel_list: panelList, // ส่งรายการทั้งหมด ไม่ใช่ inputPanel เดี่ยวๆ
      lot_no: inputLotNO,
      op_code: inputOpId,
    };

    try {
      setLoading(true);
      const response = await axios.post(url, data);
      setUpdateRecord(response.data);
      console.log("API Response:", response.data);
    } catch (err: any) {
      setUpdateRecord([]);
      setError(err.message || "Something went wrong");
      throw err; // Re-throw to handle in calling function
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (inputLotNO !== "" && isCheckboxChecked) {
      fetchCardData();
    }
  }, [isCheckboxChecked]);

  return {
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

    isCheckboxChecked,
    setIsCheckboxChecked,

    updatePanelData,

    panelList,
    setPanelList,

    handleKeyDown,
    handleAddPanel,

    // Export the new function
    handleSmartBinOOSSubmit,
  };
};
