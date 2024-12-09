import { Button, Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = (props) => {
  const { isViewDrawerOpen, setIsViewDrawerOpen, dataDetail, setDataDetail } =
    props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    console.log("check props ", isViewDrawerOpen);
    setIsViewDrawerOpen(false);
    setDataDetail(null);
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
      <Drawer
        title="Basic Drawer"
        onClose={onClose}
        open={isViewDrawerOpen}
        width={"40vw"}
      >
        <p>Id: {dataDetail?._id}</p>
        <br />
        <p>Full name: {dataDetail?.fullName}</p>
        <br />
        <p>Email: {dataDetail?.email}</p>
        <br />
        <p>PhoneNumber: {dataDetail?.phone}</p>
        <br />
        <p>Avatar: </p>
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
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              dataDetail?.avatar
            }`}
            alt=""
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
            Upload avatar
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            onChange={handleOnChangeFile}
          />
        </div>
        {preview && (
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
              src={preview}
              alt=""
            />
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
