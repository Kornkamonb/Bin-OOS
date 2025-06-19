import axios from "axios";
import Swal from "sweetalert2";

export const handleUpdateFunction = async (
  updateRecord,
  setUpdateRecord,
  setOpen
) => {
  try {
    console.log(updateRecord);
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const response = await axios.put(
      `http://10.17.66.242:3000/smt-mot/pickandplace/fuji_oss/update/${updateRecord.id}`,
      updateRecord
    );

    console.log(response);
    if (response.status === 200) {
      if (response.data.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Update Success",
        });
        setOpen(false);
        setUpdateRecord([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Update Failed",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Update Failed",
      });
    }

    Swal.close();
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.log(error);
      //ปัญหาเกิดจากการเชื่อมต่อไม่สำเร็จฝั่ง server
      Swal.fire({
        title: error.response.data.status,
        text: error.response.data.message,
        icon: "error",
        timer: 1500,
      });
    } else {
      //ปัญหาเกิดจากการเชื่อมต่อไม่สำเร็จ ฝั่ง client or network
      Swal.fire({
        title: "Connection Error",
        text: error.message,
        icon: "error",
        timer: 1500,
      });
    }
  }
};
