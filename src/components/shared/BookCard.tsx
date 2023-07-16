import { Link } from 'react-router-dom';

interface IBookProps {
  image: string;

  BookAuthor: string;
  BookTitle: string;
  titleHref: string;

  BookGenre: string;
  BookPublicationDate: string;
}

const BookCard = ({
  image,
  BookTitle,
  BookAuthor,
  BookGenre,
  BookPublicationDate,
  titleHref,
}: IBookProps) => {
  return (
    <>
      {/*  */}
      <div className="overflow-hidden bg-white rounded-lg ">
        <div className="">
          <img src={image} alt="" className="w-full h-full object-fill" />
        </div>
        <div className="p-2  sm:p-3 xl:p-3">
          <div>
            <h3>
              <Link
                to={titleHref ? titleHref : '/'}
                className="block text-md font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
              >
                {BookTitle}
              </Link>
            </h3>
            <p className="text-base leading-relaxed mb-7 text-body-color">
              {BookAuthor}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <p> {BookGenre}</p>
            <p> {BookPublicationDate}</p>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default BookCard;
