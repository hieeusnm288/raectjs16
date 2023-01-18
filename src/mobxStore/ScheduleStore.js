import {
  getLichCoQuan,
  getDetailLich,
  getUserDepartments,
} from "../service/Appservice";
import { useState } from "react";

export function ScheduleStore() {
  const [schedule, setSchedule] = useState([]);
  const [detialLich, setDetialLich] = useState();
  const [userDepartments, setUserDepartments] = useState();
  return {
    lstSchedule: [schedule],
    chiTietLich: [detialLich],
    lstDepartments: [userDepartments],
    async getSchedule(from_date, to_date) {
      const res = await getLichCoQuan(from_date, to_date);
      setSchedule(res);
    },

    async getDetaiSchedule(code) {
      const res = await getDetailLich(code);
      //   console.log("res detail:", res);
      setDetialLich(res);
    },

    async getUserPhongBan() {
      const res = await getUserDepartments();
      setUserDepartments(res);
    },
  };
}
