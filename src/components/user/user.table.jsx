import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserDetail from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
  const {
    dataUsers,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const confirm = (id) => {
    deleteUser(id);
  };

  const deleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "Delete user successfully",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Delete user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current && +pagination.current !== +current) {
      setCurrent(+pagination.current);
    }

    if (
      pagination &&
      pagination.pageSize &&
      +pagination.pageSize !== +pageSize
    ) {
      setPageSize(+pagination.pageSize);
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },

    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setIsViewDrawerOpen(true);
              setDataDetail(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              style={{ cursor: "pointer", color: "orange" }}
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
            />
            <Popconfirm
              title="Xoá người dùng"
              description="Bạn chắc chắn xoá user này ?"
              onConfirm={() => {
                confirm(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUserDetail
        isViewDrawerOpen={isViewDrawerOpen}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
