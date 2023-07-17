import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FilterBooks from '../components/screen/FilterBooks';
import BookCard from '../components/shared/BookCard';
import Container from '../components/ui/Container';
import { useGetAllBooksQuery } from '../redux/features/books/bookApi';
import { IBook } from '../types/globalTypes';

const Books = () => {
  const { data: books, isLoading } = useGetAllBooksQuery({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book Store - All books</title>
      </Helmet>

      <div>
        <section className="pt-20 pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
          <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
            <h2 className="text-4xl font-semibold mb-3 ">
              All Books Collection
            </h2>

            <p className="text-zinc-600 mb-3 lg:mx-96">
              Contrary to popular belief, Lorem Ipsum is not simply random.
            </p>
          </div>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
              <div className="border ">
                <FilterBooks />
              </div>
              <div className="lg:col-span-3 ">
                {isLoading ? (
                  'Loading'
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
                    {books.data.map(
                      ({
                        _id,
                        title,
                        genre,
                        publicationDate,
                        author,
                      }: IBook) => (
                        <BookCard
                          key={_id}
                          image="https://i.ibb.co/r2zns1m/image-01.jpg"
                          BookTitle={title}
                          BookGenre={genre}
                          BookPublicationDate={publicationDate}
                          titleHref={`/book/${_id}`}
                          BookAuthor={author}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Books;
