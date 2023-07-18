import { IBook } from '../../redux/features/api/type';
import { useGetAllBooksQuery } from '../../redux/features/books/bookApi';

import BookCard from '../shared/BookCard';
import Container from '../ui/Container';

const TopBooks = () => {
  const { data: books, isLoading } = useGetAllBooksQuery({});
  return (
    <div className="mt-16">
      <section className="pt-20 pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
        <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
          <h2 className="text-4xl font-semibold mb-3 ">Top 10 Collections</h2>

          <p className="text-zinc-600 mb-3 lg:mx-96">
            Contrary to popular belief, Lorem Ipsum is not simply random.
          </p>
        </div>
        <Container>
          {isLoading ? (
            'Loading'
          ) : (
            <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-12 lg:mt-12">
              {books?.data.length ? (
                <>
                  {books.data.map(
                    ({ _id, title, genre, publicationDate, author }: IBook) => (
                      <BookCard
                        key={_id}
                        image="https://i.ibb.co/r2zns1m/image-01.jpg"
                        BookTitle={title}
                        BookGenre={genre}
                        publicationDate={publicationDate}
                        titleHref={`/book/${_id}`}
                        BookAuthor={author}
                      />
                    )
                  )}
                </>
              ) : (
                <p>No data is present.</p>
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default TopBooks;
