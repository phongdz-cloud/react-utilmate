import { useEffect, useState } from "react";
import BookTable from "../components/book/BookTable";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/BookForm";
import BookFormAdvance from "../components/book/BookFormAdvance";

const BookPage = () => {
  const [dataBooks, setDataBooks] = useState([]);
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
      {/* <BookForm loadBook={loadBook} /> */}
      <BookFormAdvance loadBook={loadBook} />
      <BookTable
        dataBooks={dataBooks}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default BookPage;
