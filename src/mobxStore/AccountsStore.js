import React, { useState } from "react";
import {
  getNhanVien,
  getNhanVienGiam,
  getNhanVienByStatus,
} from "../service/Appservice";
export function AccountStore() {
  const [nhanVien, setNhanVien] = useState();
  const [totalPage, setToTalPage] = useState();
  return {
    listNhanVien: nhanVien,
    totalPageNV: totalPage,
    async getListNhanVien(page, keyword, congty) {
      const res = await getNhanVien(page, keyword, congty);
      setNhanVien(res.data);
      //   console.log(res.total_page);
      setToTalPage(res.total_page);
    },

    async getListNhanVienGiam(page, keyword, congty) {
      const res = await getNhanVienGiam(page, keyword, congty);
      setNhanVien(res.data);
    },
    async getListNhanVienTrangThai(page, keyword, congty) {
      const res = await getNhanVienByStatus(page, keyword, congty);
      setNhanVien(res.data);
    },
  };
}
