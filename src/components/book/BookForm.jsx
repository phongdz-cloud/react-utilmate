import { Button, Input, InputNumber, Modal, Select } from "antd";
import { useState } from "react";

const BookForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataBook, setDataBook] = useState({
    mainText: "",
    author: "",
    price: null,
    quantity: null,
    category: "Arts",
  });

  const handleSubmitBtn = () => {
    console.log(dataBook);
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setDataBook({
      mainText: "",
      author: "",
      price: null,
      quantity: null,
      category: "Arts",
    });
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
        </div>
      </Modal>
    </>
  );
};

export default BookForm;
