import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../ui/Container';
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from '../../redux/features/books/bookApi';
import { toast } from 'react-toastify';
import {
  useCreateReadingListMutation,
  useCreateWishListMutation,
} from '../../redux/features/auth/authApi';

const DetailsBook: React.FC<{
  bookId: string;
}> = ({ bookId }) => {
  const navigate = useNavigate();
  const [wishlistSubmitted, setWishlistSubmitted] = useState(false);
  const [readingListSubmitted, setReadingListSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: bookData } = useGetBookByIdQuery(bookId!);

  const [
    createWishList,
    {
      isError: wishlistError,
      isSuccess: wishlistSuccess,
      isLoading: wishlistLoading,
    },
  ] = useCreateWishListMutation();

  const [
    createReadingList,
    {
      isSuccess: readingListSuccess,
      isLoading: readingListLoading,
      isError: readingListError,
    },
  ] = useCreateReadingListMutation();

  const [deleteBook, { data, isLoading, isSuccess, isError }] =
    useDeleteBookMutation();

  const handleAddToWishlist = async () => {
    if (!wishlistSubmitted) {
      createWishList({
        bookId: bookId!,
      });
      setWishlistSubmitted(true);
    }
  };

  const handleAddToReadingList = () => {
    if (!readingListSubmitted) {
      createReadingList({
        bookId: bookId!,
        status: 'To Read',
      });
      setReadingListSubmitted(true);
    }
  };

  useEffect(() => {
    if (wishlistSuccess) {
      toast.success('Added to Wishlist', {
        autoClose: 2000,
        toastId: Math.random(),
      });
    }

    if (wishlistError) {
      toast.error('Book already added to wishlist', {
        autoClose: 2000,
        toastId: Math.random(),
      });
    }
  }, [wishlistSuccess, wishlistError]);

  useEffect(() => {
    if (readingListSuccess) {
      toast.success('Added to Reading List', {
        autoClose: 2000,
        toastId: Math.random(),
      });
    }

    if (readingListError) {
      toast.error('Book already added to reading list', {
        autoClose: 2000,
        toastId: Math.random(),
      });
    }
  }, [readingListSuccess, readingListError]);

  useEffect(() => {
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
  }, [isSuccess, isError, data?.message, navigate]);

  const handleDeleteBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(bookId);
    }
  };

  return (
    <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pb-20 min-h-screen">
      <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
        <h2 className="text-4xl font-semibold mb-3">Book Details</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-xl mb-2">
            {bookData?.data?.title?.toUpperCase()}
          </h3>
          <p className="text-gray-700 mb-4">By {bookData?.data?.author}</p>
          <div className="flex space-x-2 mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Genre: {bookData?.data?.genre}
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
                disabled={
                  wishlistLoading || wishlistSuccess || wishlistSubmitted
                }
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                {wishlistSuccess ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                type="button"
                onClick={handleAddToReadingList}
                disabled={
                  readingListLoading ||
                  readingListSuccess ||
                  readingListSubmitted
                }
                className="w-full px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                {readingListSuccess
                  ? 'Added to Reading List'
                  : 'Add to Reading List'}
              </button>
              <Link
                to={`/updatebook/${bookId}`}
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
