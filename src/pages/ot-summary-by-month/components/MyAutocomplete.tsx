import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface MyAutocompleteProps {
  modalData: any[];
  selectValue: string;
  setSelectValue: (value: string) => void;
  uniqueKey: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

const removeDuplicates = (data: any, key: any) => {
  const uniqueSet = new Set();
  return data.filter((item: any) => {
    if (uniqueSet.has(item[key])) {
      return false; // ข้ามค่าที่ซ้ำ
    }
    uniqueSet.add(item[key]);
    return true; // เก็บค่าแรกที่ไม่ซ้ำ
  });
};

const MyAutocomplete = ({
  modalData,
  selectValue,
  setSelectValue,
  uniqueKey,
  label,
  disabled,
}: MyAutocompleteProps) => {
  const uniqueOptions = removeDuplicates(modalData, uniqueKey);
  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      options={uniqueOptions}
      getOptionLabel={(option) => {
        // Handle null, undefined, or empty values
        const value = option[uniqueKey];
        return value != null ? String(value) : "";
      }}
      groupBy={(option) => option[uniqueKey]?.charAt(0) || "NULL"}
      value={
        uniqueOptions.find((item: any) => item[uniqueKey] === selectValue) ||
        null
      }
      onChange={(event, newValue) => {
        console.log(event);
        setSelectValue(newValue ? newValue[uniqueKey] : "");
      }}
      renderInput={(params) => (
        <TextField {...params} label={label || "Select an Option"} />
      )}
      isOptionEqualToValue={(option, value) =>
        option[uniqueKey] === value[uniqueKey]
      }
    />
  );
};

export default MyAutocomplete;
