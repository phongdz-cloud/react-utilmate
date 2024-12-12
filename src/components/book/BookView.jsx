import { Drawer } from "antd";
import { useEffect } from "react";

const BookView = (props) => {
  const { dataBook, setDataBook, isViewDrawerOpen, setIsViewDrawerOpen } =
    props;

  useEffect(() => {}, [dataBook]);

  return (
    <Drawer
      title="Chi tiết Book"
      onClose={() => {
        setIsViewDrawerOpen(false);
        setDataBook(null);
      }}
      open={isViewDrawerOpen}
      width={"40vw"}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>Id: {dataBook?._id}</p>
        <p>Tiêu đề: {dataBook?.mainText}</p>
        <p>Tác giả: {dataBook?.author}</p>
        <p>Thể loại: {dataBook?.category}</p>
        <p>
          Gía tiền:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(dataBook?.price)}
        </p>
        <p>Số lượng: {dataBook?.quantity}</p>
        <p>Đã bán: {dataBook?.sold}</p>
        <p>Thumbnmail:</p>
        <div
          style={{
            marginTop: "10px",
            height: "100px",
            width: "150px",
            border: "1px solid #ccc",
          }}
        >
          <img
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
              dataBook?.thumbnail
            }`}
            alt=""
          />
        </div>
        {/* <div>
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
            Upload avatar
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            // onChange={handleOnChangeFile}
          />
        </div> */}
        {/* {preview && (
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
            <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
              Save
            </Button>
          </div>
        )} */}
      </div>
    </Drawer>
  );
};

export default BookView;
