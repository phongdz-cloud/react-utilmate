import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [dataBook, setDataBook] = useState({
    mainText: "",
    author: "",
    price: null,
    quantity: null,
    category: "Arts",
  });

  const { loadBook } = props;

  const handleSubmitBtn = async () => {
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

      const resCreateBook = await createBookApi({ ...dataBook, thumbnail });

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
    setDataBook({
      mainText: "",
      author: "",
      price: null,
      quantity: null,
      category: "Arts",
    });
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
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText="CREATE"
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Tiêu đề</span>
            <Input
              value={dataBook.mainText}
              onChange={(event) => {
                setDataBook({ ...dataBook, mainText: event.target.value });
              }}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={dataBook.author}
              onChange={(event) => {
                setDataBook({ ...dataBook, author: event.target.value });
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Giá tiền</span>
            <InputNumber
              addonAfter="đ"
              value={dataBook.price}
              onChange={(value) => setDataBook({ ...dataBook, price: value })}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Số lượng</span>
            <InputNumber
              addonAfter=""
              style={{ width: "100%" }}
              value={dataBook.quantity}
              onChange={(value) =>
                setDataBook({ ...dataBook, quantity: value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Thể loại</span>
            <Select
              value={dataBook.category}
              style={{
                width: "100%",
              }}
              onChange={(value) =>
                setDataBook({ ...dataBook, category: value })
              }
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
          </div>
          <div>
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
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={preview}
                alt=""
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default BookForm;
