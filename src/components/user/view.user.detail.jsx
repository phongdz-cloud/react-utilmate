import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {
  const { isViewDrawerOpen, setIsViewDrawerOpen, dataDetail, setDataDetail } =
    props;

  const onClose = () => {
    console.log("check props ", isViewDrawerOpen);
    setIsViewDrawerOpen(false);
    setDataDetail(null);
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
        <div>
          <img
            height={100}
            width={150}
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
          <input type="file" hidden id="btnUpload" />
        </div>
        {/* <Button type="primary">Upload avatar</Button> */}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
