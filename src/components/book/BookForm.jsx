import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import {
  createBookApi,
  handleUploadFile,
  updateBookApi,
} from "../../services/api.service";

const BookForm = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    loadBook,
    dataBookForm,
    isModalOpen,
    setIsModalOpen,
    setDataBookForm,
  } = props;

  useEffect(() => {
    if (dataBookForm) {
      setDataBook({ ...dataBookForm });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataBookForm?.thumbnail
        }`
      );
    }
  }, [dataBookForm]);

  const [dataBook, setDataBook] = useState({
    mainText: "",
    author: "",
    price: null,
    quantity: null,
    category: "Arts",
  });

  const handleSubmitBtn = async () => {
    if (!dataBookForm?._id) {
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
    } else {
      let thumbnail = dataBook.thumbnail;
      if (selectedFile) {
        const resUpload = await handleUploadFile(selectedFile, "book");
        thumbnail = resUpload.data.fileUploaded;
      }

      const resUpdateBook = await updateBookApi(dataBookForm._id, {
        ...dataBook,
        thumbnail,
      });

      if (resUpdateBook.data) {
        notification.success({
          message: "Update book success",
          description: "Cập nhật sách thành công",
        });
        resetAndCloseModal();
        await loadBook();
      } else {
        notification.error({
          message: "Error update book",
          description: JSON.stringify(resUpdateBook.message),
        });
      }
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
    setDataBookForm(null);
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
          {/* {dataBookForm && dataBookForm._id ? " Update Book" : "Create Book"} */}
        </Button>
      </div>
      <Modal
        title={
          dataBookForm && dataBookForm._id ? " Update Book" : "Create Book"
        }
        open={isModalOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={dataBookForm && dataBookForm._id ? "Update" : "Create"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          {dataBookForm && dataBookForm._id && (
            <div>
              <span>Id</span>
              <Input value={dataBookForm._id} disabled />
            </div>
          )}
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
