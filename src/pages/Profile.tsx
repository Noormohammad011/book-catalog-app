import { useEffect } from 'react';
import {
  useUpdateReadingListMutation,
  useUserProfileQuery,
} from '../redux/features/auth/authApi';
import { toast } from 'react-toastify';
const Profile = () => {
  const { data: userProfile, refetch } = useUserProfileQuery();
  const [
    updateReadingList,
    {
      data: updateReadingListData,
      isLoading: isUpdateReadingListLoading,
      isSuccess: isUpdateReadingListSuccess,
    },
  ] = useUpdateReadingListMutation();
  const { data } = userProfile ?? {};

  const handleStatusChange = async (book: string, newStatus: string) => {
    try {
      await updateReadingList({
        bookId: book,
        status: newStatus,
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdateReadingListSuccess) {
      toast.success(updateReadingListData?.message, {
        autoClose: 2000,
        toastId: Math.random(),
      });
    }
  }, [isUpdateReadingListSuccess]);

  return (
    <>
      {isUpdateReadingListLoading && <div>Loading...</div>}
      <section className="relative py-[120px] h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center content-center flex-col items-center">
            <div className="w-full text-center">
              <h1 className="font-bold text-3xl uppercase">{data?.name}</h1>
            </div>
            <div className="h-56 flex justify-center content-center sm:flex-col md:flex-row gap-3">
              <div className="p-4 shadow">
                <h1 className="text-xl font-bold mb-4 text-center">WishList</h1>
                {data?.wishlist && data?.wishlist.length > 0 ? (
                  data?.wishlist?.map(
                    (item: { bookID: string; bookName?: string }) => (
                      <div
                        key={item.bookID}
                        className="p-2 bg-white shadow-md rounded-md flex"
                      >
                        <span className="mx-4">Book Name: </span>
                        <h1 className="text-lg font-semibold">
                          {item.bookName}
                        </h1>
                      </div>
                    )
                  )
                ) : (
                  <h1 className="text-lg font-semibold">
                    No Books in WishList
                  </h1>
                )}
              </div>
              <div className="p-4 shadow">
                <h1 className="text-xl font-bold mb-4 text-center">
                  ReadingList
                </h1>
                {data?.readingList && data?.readingList?.length > 0 ? (
                  data?.readingList?.map(
                    (item: {
                      book: string;
                      bookName?: string;
                      status: string;
                    }) => (
                      <div
                        key={item.book}
                        className="p-2 bg-white shadow-md rounded-md flex"
                      >
                        <span className="mx-4">Book Name: </span>
                        <h1 className="text-lg font-semibold">
                          {item.bookName}
                        </h1>
                        <span className="mx-4">Status: </span>
                        <select
                          className="border rounded-md p-2"
                          value={item.status} // Set the selected value to item.status
                          onChange={(e) =>
                            handleStatusChange(item.book, e.target.value)
                          }
                        >
                          <option value="To Read">To Read</option>
                          <option value="Currently Reading">
                            Currently Reading
                          </option>
                          <option value="Finished Reading">
                            Finished Reading
                          </option>
                        </select>
                      </div>
                    )
                  )
                ) : (
                  <h1 className="text-lg font-semibold">
                    No Books in ReadingList
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
