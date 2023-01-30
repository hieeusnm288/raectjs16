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
import { useFormik } from "formik";
import * as Yup from "yup";

const { SHOW_PARENT } = TreeSelect;
const validateMessages = {
  required: "${label} is required!",
};
function CreateLich() {
  const schedule = ScheduleStore();
  // Tree Select
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

  const [startDate, setStartDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState();
  const [assignees, setAssignees] = useState();

  const onFinish = (values) => {
    values.event_notice = form.getFieldValue("data");
    console.log(values);
  };

  const onChangeTree = (newValue) => {
    setValue(newValue);
    formik.setFieldValue("assignees", newValue);
  };

  // const onChangeDate = (date, dateString) => {
  //   setStartDate(dateString);
  //   // formik.setFieldValue("start_at", dateString);
  // };
  const onChangeStart = (start, timeStart) => {
    // setTimeStartt(start)
    formik.setFieldValue("start_at", `${start}`);
    console.log("start", start);
  };

  const onChangeEnd = (end, timeEnd) => {
    // console.log('first', timeEnd)
    formik.setFieldValue("end_at", timeEnd);
  };
  const today = new Date();

  const getPhongBan = () => {
    schedule.getUserPhongBan();
  };

  const formik = useFormik({
    initialValues: {
      start_at: "",
      // created_at: "",
      end_at: "",
      host: "",
      location: "",
      preparation: "",
      event_notice: "",
      attenders: "",
      assignees: [],
      last_edit_by: "",
    },
    validationSchema: Yup.object({
      // start_at: Yup.string()
      //     .required("Không được để trống !"),
      // Password: Yup.string()
      //     .min(6, "Tối thiểu 6 kí tự")
      //     .required("Không được trống !"),
      // Role: Yup.string()
      //     .required("Không được trống !"),
      // Address: Yup.string()
      //     .required("Không được trống !"),
      // PhoneNumber: Yup.string()
      //     .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
      //         message: "Số điện thoại chưa đúng",
      //         excludeEmptyString: false,
      //     })
      //     .required("Không được trống !"),
    }),
    onSubmit: (values) => {
      console.log("first", values);
    },
  });

  useEffect(() => {
    getPhongBan();
  }, []);

  return (
    <div className="container">
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={formik.handleSubmit}
        validateMessages={validateMessages}
        form={form}
      >
        <div className="d-flex justify-content-between">
          <Form.Item
            name="start_at"
            label="Ngày Thực Hiện"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              // onChange={onChangeDate}
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
              onChange={onChangeStart}
              defaultOpenValue={moment("00:00", "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>
          <Form.Item name="end_at" label="Thời gian kết thúc">
            <TimePicker
              onChange={onChangeEnd}
              defaultOpenValue={moment("00:00", "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Chủ trì"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="host" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          label="Địa điểm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="location" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Nội dung dự kiến">
          <CKEditor
            editor={ClassicEditor}
            data=""
            name="event_notice"
            // onReady={editor => {
            //     // You can store the "editor" and use when it is needed.
            //     console.log('Editor is ready to use!', editor);
            // }}
            onChange={(event, editor) => {
              const data = editor.getData();
              formik.setFieldValue("event_notice", data);
            }}
            // onBlur={(event, editor) => {
            //     console.log('Blur.', editor);
            // }}
            // onFocus={(event, editor) => {
            //     console.log('Focus.', editor);
            // }}
          />
        </Form.Item>
        <Form.Item name="file_ids" label="Tài liệu đính kèm">
          <div className="d-flex">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn tài liệu đính kèm</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label="Thành Viên Tham gia">
          <Input name="attenders" onChange={formik.handleChange} />
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
