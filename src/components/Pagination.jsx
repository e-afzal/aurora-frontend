import { useState, useEffect } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const [paginationMargin, setPaginationMargin] = useState("0rem");
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setPaginationMargin("7rem");
    }
  }, []);

  return (
    <>
      <nav style={{ marginTop: paginationMargin }}>
        <ul style={{ display: "flex", justifyContent: "center" }}>
          {pageNumbers.map((number, index) => (
            <li key={index}>
              <a
                style={{
                  borderRadius: "5px",
                  color: number === currentPage ? "#fff" : "#000",
                  backgroundColor: number === currentPage ? "#000" : "#fff",
                  border: `1.5px solid #000`,
                  fontSize: "15px",
                  paddingInline: "2rem",
                  paddingBlock: "1rem",
                  marginRight: ".5rem"
                }}
                onClick={(e) => paginate(e, number)}
                href="!#">{number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;