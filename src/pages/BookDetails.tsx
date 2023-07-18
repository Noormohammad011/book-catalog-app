import { Helmet } from 'react-helmet';
import CommentBox from '../components/screen/CommentBox';
import DetailsBook from '../components/screen/DetailsBook';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
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
          <CommentBox bookId={id!} />
        </div>
      </div>
    </>
  );
};

export default BookDetails;
