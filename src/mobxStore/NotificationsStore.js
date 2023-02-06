import {
  getThongBaoChung,
  getDetailThongBao,
  getTaiLieuThongBao,
  UploadFile,
  createThongBao,
  getUser,
  deleteThongBao,
} from "../service/Appservice";
import { useState } from "react";

export function NotificationsStore() {
  const [listThongBao, setListThongBao] = useState([]);
  const [detailTB, setDeatilTB] = useState();
  const [fileTB, setFileTB] = useState();
  const [user, setUser] = useState();
  return {
    lstThongBao: listThongBao,
    detailThongBao: detailTB,
    filesTB: fileTB,
    userInfo: user,
    async getListThongBao(page) {
      const res = await getThongBaoChung(page);
      //   console.log(res.data);
      setListThongBao(res.data);
    },

    async getDetail(id) {
      const res = await getDetailThongBao(id);
      setDeatilTB(res);
    },

    async getFile(file_id) {
      const res = await getTaiLieuThongBao(file_id);
      console.log(res);
    },
    async uploadFiles() {
      const res = await UploadFile();
      setDeatilTB(res);
      console.log(res);
    },

    async getAuthor() {
      const res = await getUser();
      setUser(res);
    },

    async DangThongBao(data) {
      // console.log("data", data);
      const res = await createThongBao(data);
      // console.log("res", res);
    },

    async XoaThongBao(id) {
      const res = await deleteThongBao(id);
    },
  };
}
