import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { useGetAllBooksQuery } from '../../redux/features/books/bookApi';

const TrendyBooks = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery({});

  return (
    <div>
      <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
        <h2 className="text-4xl font-semibold mb-3">Trendy Collections</h2>

        <p className="text-zinc-600 mb-3 lg:mx-96">
          {
            JSON.stringify(data)
          }
        </p>
      </div>
      <Container>
        <div className="w-full text-zinc-800 text-sm">
          <div className="flex flex-col lg:flex-row flex-wrap -ml-1 -mr-1">
            <div className="basis-1/3 px-1">
              <div className="mb-3 relative overflow-hidden">
                <Link to="allbooks" className="cursor-pointer">
                  <img
                    src="https://noraure-5.myshopify.com/cdn/shop/files/1.png?v=1646025567"
                    className="h-64 w-96 align-middle overflow-clip"
                  />
                </Link>
                <div className="bottom-[12.63rem] left-[3.13rem] absolute right-[17.35rem] top-[2.38rem]">
                  <h3 className="text-neutral-800 text-[1.38rem] leading-7 font-medium">
                    Photography
                  </h3>
                </div>
              </div>
              <div className="mb-3 relative overflow-hidden">
                <Link to="allbooks" className="cursor-pointer">
                  <img
                    src="https://noraure-5.myshopify.com/cdn/shop/files/2.png?v=1646025600"
                    className="h-64 w-96 align-middle overflow-clip"
                  />
                </Link>
                <div className="bottom-[12.63rem] left-[3.13rem] absolute right-[19.36rem] top-[2.38rem]">
                  <h3 className="text-neutral-800 text-[1.38rem] leading-7 font-medium">
                    Romance
                  </h3>
                </div>
              </div>
            </div>
            <div className="basis-1/3 px-1">
              <div className="mb-3 relative overflow-hidden">
                <Link to="allbooks" className="cursor-pointer">
                  <img
                    src="https://noraure-5.myshopify.com/cdn/shop/files/3.png?v=1646029746"
                    className="h-[34.31rem] w-96 align-middle overflow-clip"
                  />
                </Link>
                <div className="bottom-[30.06rem] left-[3.13rem] absolute right-[17.70rem] top-[2.38rem]">
                  <h3 className="text-neutral-800 text-[1.38rem] leading-7 font-medium">
                    Health Pack
                  </h3>
                </div>
              </div>
            </div>
            <div className="basis-1/3 px-1">
              <div className="mb-3 relative overflow-hidden">
                <Link to="allbooks" className="cursor-pointer">
                  <img
                    src="https://noraure-5.myshopify.com/cdn/shop/files/4.png?v=1646029824"
                    className="h-64 w-96 align-middle overflow-clip"
                  />
                </Link>
                <div className="bottom-[12.63rem] left-[3.13rem] absolute right-[17.02rem] top-[2.38rem]">
                  <h3 className="text-neutral-800 text-[1.38rem] leading-7 font-medium">
                    Adult
                  </h3>
                </div>
              </div>
              <div className="mb-3 relative overflow-hidden">
                <Link to="allbooks" className="cursor-pointer">
                  <img
                    src="https://noraure-5.myshopify.com/cdn/shop/files/5.png?v=1646029863"
                    className="h-64 w-96 align-middle overflow-clip"
                  />
                </Link>
                <div className="bottom-[12.63rem] left-[3.13rem] absolute right-[18.64rem] top-[2.38rem]">
                  <h3 className="text-neutral-800 text-[1.38rem] leading-7 font-medium">
                    Baby & Kids
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrendyBooks;
