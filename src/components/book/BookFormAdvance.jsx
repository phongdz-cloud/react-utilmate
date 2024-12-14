import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookFormAdvance = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { loadBook } = props;

  const onFinish = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }

    const resUpload = await handleUploadFile(selectedFile, "book");

    if (resUpload.data) {
      const thumbnail = resUpload.data.fileUploaded;

      const resCreateBook = await createBookApi({ ...values, thumbnail });

      if (resCreateBook.data) {
        notification.success({
          message: "Create book success",
          description: "Tạo mới sách thành công",
        });
        resetAndCloseModal();
        await loadBook();
      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(resCreateBook.message),
        });
      }
    } else {
      notification.error({
        message: "Error create book",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreview(null);
    form.resetFields();
  };

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <h3 style={{ marginTop: "10px" }}>Table Books</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Book
        </Button>
      </div>
      <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText="CREATE"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item
              label="Tiêu đề"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: "Tiêu đề không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Tác giả không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Giá tiền không được để trống",
                },
              ]}
            >
              <InputNumber addonAfter="đ" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Số lượng không được để trống",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Thể loại không được để trống",
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={[
                  { value: "Arts", label: "Arts" },
                  { value: "Business", label: "Business" },
                  { value: "Comics", label: "Comics" },
                  { value: "Cooking", label: "Cooking" },
                  { value: "Entertainment", label: "Entertainment" },
                  { value: "History", label: "History" },
                  { value: "Music", label: "Music" },
                  { value: "Sports", label: "Sports" },
                  { value: "Teen", label: "Teen" },
                  { value: "Travel", label: "Travel" },
                ]}
              />
            </Form.Item>

            <div>
              <p>Ảnh thumbnail</p>
              <label
                htmlFor="btnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Upload
              </label>
              <input
                type="file"
                hidden
                id="btnUpload"
                onChange={handleOnChangeFile}
                onClick={(event) => {
                  event.target.value = null;
                }}
                style={{ display: "none" }}
              />
            </div>
            {preview && (
              <div
                style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  marginBottom: "15px",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                  alt=""
                />
              </div>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default BookFormAdvance;
