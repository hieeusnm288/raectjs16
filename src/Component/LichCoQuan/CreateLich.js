import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  message,
  Upload,
  TreeSelect,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import { ScheduleStore } from "../../mobxStore/ScheduleStore";

const { SHOW_PARENT } = TreeSelect;
const validateMessages = {
  required: "${label} is required!",
};
function CreateLich() {
  const schedule = ScheduleStore();
  // Tree Select
  console.log("Phong Ban", schedule?.lstDepartments[0]);
  const [form] = Form.useForm();
  // const phongBan = schedule?.lstDepartments[0]?.map((index) => index.name);
  // console.log("phong ban: ", phongBan);
  const treeData = schedule?.lstDepartments[0]?.map((item, index) => {
    return {
      title: item?.name,
      value: item?.code,
      children: item.users?.map((item1, index1) => {
        return {
          title: item1?.name_uppercase,
          value: item1?.user_code,
        };
      }),
    };
  });
  const [value, setValue] = useState(undefined);
  const onChangeTree = (newValue) => {
    setValue(newValue);
  };
  // const tProps = {
  //   treeData,
  //   value,
  //   onChangeTree,
  //   treeCheckable: true,
  //   showCheckedStrategy: SHOW_PARENT,
  //   placeholder: "- Chọn người nhận thông báo -",
  //   style: {
  //     width: "100%",
  //   },
  // };
  // Upload
  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onFinish = (values) => {
    values.event_notice = form.getFieldValue("data");
    console.log(values);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };
  const today = new Date();

  const getPhongBan = () => {
    schedule.getUserPhongBan();
  };

  useEffect(() => {
    getPhongBan();
  }, []);

  return (
    <div className="container">
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <div className="d-flex justify-content-between">
          <Form.Item
            name="created_at"
            label="Ngày Thực Hiện"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              onChange={onChangeDate}
              defaultValue={moment(today, "DD-MM-YYYY")}
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item
            name="start_at"
            label="Thời gian bắt đầu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              onChange={onChangeTime}
              defaultOpenValue={moment("00:00", "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>
          <Form.Item name="end_at" label="Thời gian kết thúc">
            <TimePicker
              onChange={onChangeTime}
              defaultOpenValue={moment("00:00", "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>
        </div>
        <Form.Item
          name="host"
          label="Chủ trì"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Địa điểm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="event_notice" label="Nội dung dự kiến">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              // console.log(editor);
              const data = editor.getData();
              console.log(data);
              form.setFieldsValue(data);
            }}
          />
        </Form.Item>
        <Form.Item name="file_ids" label="Tài liệu đính kèm">
          <div className="d-flex">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn tài liệu đính kèm</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item name="attenders" label="Thành Viên Tham gia">
          <Input />
        </Form.Item>
        <Form.Item name="assignees" label="Thông báo">
          <TreeSelect
            showSearch
            style={{
              width: "100%",
            }}
            value={value}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChangeTree}
            treeData={treeData}
            treeCheckable={true}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateLich;
