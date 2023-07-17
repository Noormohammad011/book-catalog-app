import { Helmet } from 'react-helmet';
import DetailsBook from '../components/screen/DetailsBook';
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../redux/features/books/bookApi';

const BookDetails = () => {
  const { id } = useParams();
  
  const {
    data: book,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetBookByIdQuery(id!)

  console.log('book', book.data);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book Store - Details of book</title>
      </Helmet>
      <div>
        <div>
          
        </div>
        <div>
          <DetailsBook />
        </div>
      </div>
    </>
  );
};

export default BookDetails;
