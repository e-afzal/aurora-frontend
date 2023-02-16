import { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from '../../components/Posts';
import Pagination from '../../components/Pagination';

const PaginatedProducts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  //? Pagination related: Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage; // 1*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

  // HANDLER: Change page
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3' >My App</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default PaginatedProducts;