import { Drawer } from "antd";

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
      <Drawer title="Basic Drawer" onClose={onClose} open={isViewDrawerOpen}>
        <p>Id: {dataDetail?._id}</p>
        <p>Full name: {dataDetail?.fullName}</p>
        <p>Email: {dataDetail?.email}</p>
        <p>PhoneNumber: {dataDetail?.phone}</p>
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
