import { Helmet } from 'react-helmet';
import DetailsBook from '../components/screen/DetailsBook';

const BookDetails = () => {
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
