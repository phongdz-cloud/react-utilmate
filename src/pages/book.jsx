import { useEffect, useState } from "react";
import BookTable from "../components/book/BookTable";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/BookForm";
import BookFormAdvance from "../components/book/BookFormAdvance";

const BookPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataBooks, setDataBooks] = useState([]);
  const [dataBookForm, setDataBookForm] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      const meta = res.data.meta;
      setDataBooks(res.data.result);
      setCurrent(meta.current);
      setPageSize(meta.pageSize);
      setTotal(meta.total);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* <BookForm
        loadBook={loadBook}
        dataBookForm={dataBookForm}
        setDataBookForm={setDataBookForm}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
      <BookFormAdvance
        loadBook={loadBook}
        dataBookForm={dataBookForm}
        setDataBookForm={setDataBookForm}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <BookTable
        dataBooks={dataBooks}
        setDataBookForm={setDataBookForm}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default BookPage;
