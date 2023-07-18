import { Helmet } from 'react-helmet';
import CommentBox from '../components/screen/CommentBox';
import DetailsBook from '../components/screen/DetailsBook';

const BookDetails = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book Store - Details of book</title>
      </Helmet>
      <div>
        <div></div>
        <div>
          <DetailsBook />
          <CommentBox />
        </div>
      </div>
    </>
  );
};

export default BookDetails;
