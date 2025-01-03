import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import BookView from "./BookView";
import { useState } from "react";
import { deleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {
  const {
    dataBooks,
    setDataBookForm,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
    setIsModalOpen,
    loadBook,
    loadingTable,
  } = props;

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const [dataBook, setDataBook] = useState(null);

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
              setDataBook(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá Tiền",
      dataIndex: "price",
      render: (_, record) => {
        return (
          <>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(record?.price)}
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
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
                console.log("record", record);
                setDataBookForm(record);
                setIsModalOpen(true);
              }}
            />
            <Popconfirm
              title="Xoá sách"
              description="Bạn chắc chắn xoá sách này ?"
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

  const confirm = (id) => {
    deleteBook(id);
  };

  const deleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: "Delete book successfully",
      });
      await loadBook();
    } else {
      notification.error({
        message: "Delete book",
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

  return (
    <>
      <Table
        dataSource={dataBooks}
        columns={columns}
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
        loading={loadingTable}
      />

      <BookView
        dataBook={dataBook}
        setDataBook={setDataBook}
        isViewDrawerOpen={isViewDrawerOpen}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
      />
    </>
  );
};

export default BookTable;
