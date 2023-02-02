import {
  getThongBaoChung,
  getDetailThongBao,
  getTaiLieuThongBao,
} from "../service/Appservice";
import { useState } from "react";

export function NotificationsStore() {
  const [listThongBao, setListThongBao] = useState([]);
  const [detailTB, setDeatilTB] = useState();
  return {
    lstThongBao: listThongBao,
    detailThongBao: detailTB,
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
      //   console.log(res);
    },
  };
}
