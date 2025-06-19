import axios from "axios";
import { useState, useEffect } from "react";
import { handleUpdateFunction } from "./handle_update";

export const use_feature = () => {
  const [cardData, setCardData] = useState<any>([]);
  const [panelData, setPanelData] = useState<any>([]);

  const [inputLotNO, setInputLotNO] = useState<any>("");
  const [inputPanel, setInputPanel] = useState<any>("");
  const [inputOpId, setInputOpId] = useState<any>("");
  const [updateRecord, setUpdateRecord] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [panelTable, setPanelTable] = useState("");

  const updatePanelData = async () => {
    const url =
      "http://127.0.0.1:3000/api/nest/smart_bin_oos_record/bin_record/put-panel";
    const data = {
      panel_list: inputPanel,
      lot_no: inputLotNO,
      op_code: inputOpId,
    };
    try {
      setLoading(true);
      const response = await axios.put(url, data);
      setPanelData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
      console.log(response);
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

  const handle_update_record = async () =>
    handleUpdateFunction(updateRecord, () => setOpen, setUpdateRecord);

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

    handle_update_record,

    isCheckboxChecked,
    setIsCheckboxChecked,

    panelTable,
    setPanelTable,
  };
};
