import React, { Fragment, useEffect, useState } from "react";
import { AccountStore } from "../../mobxStore/AccountsStore";
import { Table, Input, Pagination, Switch, Button, Select } from "antd";
import {
  EditOutlined,
  FilterOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { titlecase } from "stringcase";
import _, { debounce, isElement } from "lodash";

function DanhSachTK() {
  const [page, setPage] = useState(0);
  const [keySearch, setSearch] = useState("");
  const [congTy, setCongTy] = useState("CPN7451091748209");
  const account = AccountStore();
  const { Search } = Input;
  const [open, setOpen] = useState(false);
  const [listUserSort, setListUserSort] = useState();

  const onSearch = (value) => {
    // console.log(value);
    setSearch(value);
    if (keySearch !== "") {
      account.getListNhanVien(page, keySearch, congTy);
    }
  };
  useEffect(() => {
    account.getListNhanVien(page, keySearch, congTy);
  }, [congTy, keySearch]);
  // console.log("List Nhan Vien QL: ", account.listNhanVien);
  const onChangeSW = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "name_uppercase",
      render: (index) => (
        <Fragment>
          {index ? (
            titlecase(index)
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "ID",
      dataIndex: "username",
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "ma_nv",
      render: (index) => (
        <Fragment>
          {index ? (
            index
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số máy nội bộ",
      dataIndex: "home_phone",
      render: (index) => (
        <Fragment>
          {index ? (
            index
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (index) => (
        <Fragment>
          {/* {index === false ? (
            <Switch onChange={onChangeSW} />
          ) : (
            <Switch defaultChecked onChange={onChangeSW} />
          )} */}
          <Switch
            defaultChecked={index === true ? true : false}
            onChange={onChangeSW}
          />
        </Fragment>
      ),
    },
    {
      title: "Công Ty",
      dataIndex: "company",
      render: (index) => (
        <Fragment>
          {index ? (
            index.name
          ) : (
            <span style={{ opacity: 0.7 }}>
              <i>Không rõ</i>
            </span>
          )}
        </Fragment>
      ),
    },
    {
      title: "Tác Vụ",
      dataIndex: "",
      render: (data) => <Button icon={<EditOutlined />}>Chỉnh Sửa</Button>,
    },
  ];

  // const onTimKiem = () => {
  //   const ele = document.getElementById("tim-kiem-nang-cao");
  //   ele.classList.remove("d-none");
  //   ele.classList.add("d-block");
  // };

  // const ofTimKiem = () => {
  //   const ele = document.getElementById("tim-kiem-nang-cao");
  //   ele.classList.remove("d-blok");
  //   ele.classList.add("d-none");
  // };

  const onOf = () => {
    setOpen(!open);
    // if (open === true) {
    //   onTimKiem();
    // } else {
    //   ofTimKiem();
    // }
  };

  const srotByName = (value) => {
    if (value === 1) {
      console.log(account.listNhanVien);
      const listUserSortName = _.orderBy(
        account.listNhanVien,
        "username",
        "asc"
      );
      setListUserSort(listUserSortName);
    }
    if (value === 2) {
      const listUserSortUserName = _.orderBy(
        account.listNhanVien,
        "username",
        "asc"
      );
      setListUserSort(listUserSortUserName);
    }
  };

  const srotBySTT = (value) => {
    if (value === 1) {
      account.getListNhanVien(page, keySearch, congTy);
    }
    // console.log(value);
    if (value === 2) {
      account.getListNhanVienGiam(page, keySearch, congTy);
    }
  };

  const fillByStatus = (value) => {
    if (value === 1) {
      account.getListNhanVien(page, keySearch, congTy);
    }
    // console.log(value);
    if (value === 2) {
      account.getListNhanVienTrangThai(page, keySearch, congTy);
    }
  };
  console.log(account.listNhanVien);
  const fillByPhongBan = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Tìm kiếm người dùng theo username...."
          onSearch={onSearch}
          enterButton
          allowClear
          style={{ marginBottom: "30px", width: "30%", display: "flex" }}
        />
        <Button onClick={onOf}>
          {open === true ? (
            <span>
              <CloseCircleOutlined /> Đóng Tìm Kiếm Nâng Cao
            </span>
          ) : (
            <span>
              <FilterOutlined /> Tìm Kiếm Nâng Cao
            </span>
          )}
        </Button>
      </div>
      <div className={open === false ? "d-none mb-5" : "d-block mb-5"}>
        <div className="row mb-5">
          <div className="col-3">
            <label className="mb-1">Sắp xếp theo</label>
            <Select
              style={{ width: "100%" }}
              onChange={srotByName}
              placeholder="Sắp sếp theo"
              //   defaultValue={contact ? contact.listCongTy[0]?.code : ""}
            >
              <Select.Option value={1}>Họ Tên</Select.Option>;
              <Select.Option value={2}>Tên đăng nhập</Select.Option>;
            </Select>
          </div>
          <div className="col-3">
            <label className="mb-1">Thứ tự</label>
            <Select
              style={{ width: "100%" }}
              onChange={srotBySTT}
              placeholder="Thứ tự"
              //   defaultValue={contact ? contact.listCongTy[0]?.code : ""}
            >
              <Select.Option value={1}>Tăng dần</Select.Option>;
              <Select.Option value={2}>Giảm dần</Select.Option>;
            </Select>
          </div>
          <div className="col-3">
            <label className="mb-1">Trạng Thái</label>
            <Select
              style={{ width: "100%" }}
              onChange={fillByStatus}
              placeholder="Trạng thái"
              //   defaultValue={contact ? contact.listCongTy[0]?.code : ""}
            >
              <Select.Option value={1}>Active</Select.Option>;
              <Select.Option value={2}>Deactive</Select.Option>;
            </Select>
          </div>
          <div className="col-3">
            <label className="mb-1">Phòng ban</label>
            <Select
              style={{ width: "100%" }}
              onChange={fillByPhongBan}
              placeholder="Phòng ban"
              //   defaultValue={contact ? contact.listCongTy[0]?.code : ""}
            >
              <Select.Option value={1}>Active</Select.Option>;
              <Select.Option value={2}>Deactive</Select.Option>;
            </Select>
          </div>
        </div>
        {/* <Button
          style={{ float: "right", marginBottom: "30px" }}
          className="btn btn-warning"
          onClick={ofTimKiem}
        >
          Đóng tìm kiếm
        </Button> */}
      </div>
      <Table
        columns={columns}
        dataSource={listUserSort ? listUserSort : account.listNhanVien}
        size="middle"
        pagination={false}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
}

export default DanhSachTK;
