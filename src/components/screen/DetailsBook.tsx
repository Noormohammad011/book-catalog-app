import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../ui/Container';
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from '../../redux/features/books/bookApi';
import { toast } from 'react-toastify';

const DetailsBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToWishlist = () => {
    // Add logic to handle adding to wishlist
    console.log('Added to Wishlist');
  };

  const handleAddToReadingList = () => {
    // Add logic to handle adding to reading list
    console.log('Added to Reading List');
  };

  const { data: bookData } = useGetBookByIdQuery(id!);

  const [deleteBook, { data, isLoading, isSuccess, isError }] =
    useDeleteBookMutation();

  if (isSuccess) {
    toast.success(data?.message, {
      autoClose: 2000,
      toastId: Math.random(),
    });
    navigate('/allbooks');
  }

  if (isError) {
    toast.error('Something Went Wrong', {
      autoClose: 2000,
      toastId: Math.random(),
    });
  }

  const handleDeleteBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  return (
    <section className="pt-20 pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
      <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
        <h2 className="text-4xl font-semibold mb-3 ">Book Details</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="font-bold text-xl mb-2">
            Book Title: {bookData?.data?.title?.toUpperCase()}
          </div>
          <p className="text-gray-700 mb-4">
            Book Author: {bookData?.data?.author}
          </p>
          <div className="flex space-x-2 mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Book Genre: {bookData?.data?.genre}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Published: {bookData?.data?.publicationDate}
            </span>
          </div>
          <p className="text-zinc-600 mb-3">{bookData?.title}.</p>
        </div>
      </div>
      <Container>
        <div className="flex justify-center items-center h-full">
          <div className="xl:w-3/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={handleAddToWishlist}
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                Add to Wishlist
              </button>
              <button
                type="button"
                onClick={handleAddToReadingList}
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                Add to Reading List
              </button>
              <Link
                to={`/updatebook/${id}`}
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                Update Book
              </Link>
              <button
                type="button"
                disabled={isLoading || isSuccess}
                onClick={handleDeleteBook}
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DetailsBook;
