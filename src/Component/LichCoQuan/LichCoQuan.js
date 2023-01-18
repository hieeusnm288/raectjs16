import { getLichCoQuan } from "../../service/Appservice";
import { Table, DatePicker, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ScheduleStore } from "../../mobxStore/ScheduleStore";

function LichCoQuan() {
  const [lichCoQuan, setLichCoQuan] = useState([]);
  // const data = lichCoQuan;
  const schedule = ScheduleStore();
  const navigate = useNavigate();

  const themMoi = () => {
    navigate("/company-work-schedule/create");
  };

  const pageDetail = (data) => {
    navigate(`/company-work-schedule/view/${data.schedule_code}`);
  };

  const columns = [
    {
      title: "Ngày Tháng",
      dataIndex: "start_at",
      render: (item, index) => (
        <>
          <div>{moment(index.start_at).format("dddd")}</div>
          <div>{moment(index.start_at).format("DD/MM")}</div>
        </>
      ),
    },
    {
      title: "Nội dung công việc",
      dataIndex: "event_notice",
      render: (item, index) => (
        <div>
          <div>
            <div>{moment(index.start_at).format("LT")}</div>
          </div>
          <div>
            {index.event_notice
              .replace("<p>", "")
              .split("</p>")
              .join("")
              .replace("<p>", "")}
          </div>
        </div>
      ),
    },
    {
      title: "Tài Liệu",
      dataIndex: "preparation",
    },
    {
      title: "Thành viên tham gia",
      dataIndex: "attenders",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
    },
    {
      title: "Chử trì",
      dataIndex: "host",
    },
    {
      title: "Chi tiết",
      dataIndex: "",
      render: (data) => (
        <>
          <Button
            onClick={() => {
              pageDetail(data);
            }}
            style={{ border: "none", background: "none" }}
          >
            <Tooltip title="Xem">
              <EyeOutlined style={{ fontSize: "20px" }} />
            </Tooltip>
          </Button>
        </>
      ),
    },
  ];

  const onChange = async (date, dateString) => {
    // console.log(schedule?.lstSchedule[0]);
    const monday = new Date(date._d);
    const sunday = new Date(date._d);
    var d = monday.getDay();
    var s = sunday.getDay();
    var diff = monday.getDate() - d + (d === 0 ? -6 : 1);
    var diff2 = sunday.getDate() - s + (s === 0 ? 0 : 6);
    const setMonday = new Date(monday.setDate(diff));
    const setSunday = new Date(sunday.setDate(diff2));
    console.log("Sunday: ", setSunday);
    const from_date = new Date(setMonday)
      .toISOString("yyyy-mm-dd")
      .split("T")[0];
    const to_date = new Date(setSunday).toISOString("yyyy-mm-dd").split("T")[0];
    // console.log("to_date: ", to_date);
    // let res = await getLichCoQuan(from_date, to_date);
    // console.log(res);
    // setLichCoQuan(res);
    schedule.getSchedule(from_date, to_date);
  };
  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: "20px", float: "right", marginLeft: "20px" }}
        onClick={themMoi}
      >
        Thêm mới sự kiện
      </Button>
      <DatePicker
        onChange={onChange}
        picker="week"
        style={{ marginBottom: "20px", float: "right" }}
        placeholder="Chọn Tuần"
      />
      <Table
        columns={columns}
        dataSource={schedule.lstSchedule[0]}
        pagination={false}
      />
      ;
    </>
  );
}

export default LichCoQuan;
