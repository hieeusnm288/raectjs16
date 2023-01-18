import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScheduleStore } from "../../mobxStore/ScheduleStore";
import moment from "moment";

function DetailLich() {
  const schedule = ScheduleStore();
  console.log(schedule.chiTietLich[0]);
  const code = useParams();
  console.log("code", code.code);
  useEffect(() => {
    fillDetail(code.code);
  }, []);

  const fillDetail = (code) => {
    schedule.getDetaiSchedule(code);
  };

  return (
    <div>
      <h2>Chi tiết sự kiện</h2>
      <div className="container mt-5">
        <dl class="d-flex w-100">
          <dt className="w-25">Thông tin</dt>
          <dt className="w-75">Mô tả chi tiết</dt>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Ngày thực hiện</dd>
          <dd className="w-75">
            {moment(schedule.chiTietLich[0]?.created_at).format("DD/MM/YYYY")}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Thời gian bắt đầu</dd>
          <dd className="w-75">
            {moment(schedule.chiTietLich[0]?.start_at).format("HH:mm")}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Thời gian kết thúc</dd>
          <dd className="w-75">
            {moment(schedule.chiTietLich[0]?.end_at).format("HH:mm")}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Chủ trì</dd>
          <dd className="w-75">{schedule.chiTietLich[0]?.host}</dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Địa điểm</dd>
          <dd className="w-75">{schedule.chiTietLich[0]?.location}</dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Chuẩn bị</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.preparation
              ? schedule.chiTietLich[0]?.preparation
              : "Không có chuẩn bị"}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Nội dung sự kiện</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.event_notice
              .replace("<p>", "")
              .split("</p>")
              .join("")
              .replace("<p>", "")}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Tài liệu đính kèm</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.file_ids
              ? "Không có tài liệu đình kèm"
              : schedule.chiTietLich[0]?.file_ids}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Thành viên tham gia</dd>
          <dd className="w-75">{schedule.chiTietLich[0]?.attenders}</dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Thông báo</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.assignees.map((index) => {
              console.log(index);
              return (
                <span>
                  {index.assignee_code !== "admin"
                    ? index.name_uppercase + ", "
                    : ""}
                </span>
              );
            })}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Ngày tạo</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.assignees.map((index) => {
              console.log(index);
              return (
                <span>
                  {index.assignee_code === "admin"
                    ? index.name_uppercase + " - "
                    : ""}
                </span>
              );
            })}
            {moment(schedule.chiTietLich[0]?.created_at).format("DD/MM/YYYY")}
          </dd>
        </dl>
        <dl class="d-flex w-100">
          <dd className="w-25">Chỉnh sửa lần cuối</dd>
          <dd className="w-75">
            {schedule.chiTietLich[0]?.last_edit_by === null
              ? "Không có thông tin"
              : schedule.chiTietLich[0]?.last_edit_by +
                " " +
                moment(schedule.chiTietLich[0]?.updated_at).format(
                  "DD/MM/YYYY"
                )}
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default DetailLich;
