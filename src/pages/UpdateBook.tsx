import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { TypeOf, z, ZodType } from 'zod';
import { genreOptions } from '../types/globalTypes';
import { IBook } from '../redux/features/api/type';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../redux/features/books/bookApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/app/hooks';

const updateBookZodSchema: ZodType<IBook> = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  genre: z
    .string()
    .min(3, { message: 'Genre must be at least 3 characters' })
    .refine((value) => genreOptions.includes(value), {
      message: 'Invalid genre option',
    }),
  publicationDate: z.date().refine(
    (value) => {
      return moment(value).format('DD/MM/YYYY');
    },
    { message: 'Invalid publication date' }
  ),
});
export type UpdateBookInput = TypeOf<typeof updateBookZodSchema>;
const UpdateBook: React.FC = () => {
  const { id } = useParams();
  const { email } = useAppSelector((state) => state.auth);
  const { data: book } = useGetBookByIdQuery(id as string);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue, // Added setValue from react-hook-form to set default values
    formState: { errors },
  } = useForm<UpdateBookInput>({
    resolver: zodResolver(updateBookZodSchema),
  });
  useEffect(() => {
    if (book?.data) {
      setValue('title', book.data.title);
      setValue('genre', book.data.genre);
      setValue('publicationDate', new Date(book.data.publicationDate));
    }
  }, [book, setValue]);

  const [updateBook, { data, isLoading, isSuccess, isError }] =
    useUpdateBookMutation();

  if (isSuccess) {
    toast.success(data?.message, {
      autoClose: 2000,
      toastId: Math.random(),
    });
    navigate('/allbooks');
  }

  if (isError) {
    toast.error('SomeThing Went Wrong', {
      autoClose: 2000,
      toastId: Math.random(),
    });
  }

  const onSubmit = (data: UpdateBookInput, id: string) => {
    const newData = {
      ...data,
      publicationDate: moment(data.publicationDate).format('MM/DD/YYYY'),
    };
    updateBook({ id, ...newData });
  };

  const isButtonDisabled =
    !book?.data?.authorID?.email || book.data.authorID.email !== email;

  return (
    <>
      {isButtonDisabled ? (
        <div className="pt-20 pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
          <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
            <h2 className="text-4xl font-semibold mb-3 ">
              You are not eligable to update this book{' '}
            </h2>
          </div>
        </div>
      ) : (
        <div className="pt-20 pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
          <div className="text-zinc-800 text-sm pb-10 text-center overflow-hidden">
            <h2 className="text-4xl font-semibold mb-3 ">Update Your Book</h2>
            <p className="text-zinc-600 mb-3 lg:mx-96">
              Contrary to popular belief, Lorem Ipsum is not simply random.
            </p>
          </div>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, id as string))}
            className="max-w-lg mx-auto p-3"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                required
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-gray-700 font-medium mb-2"
              >
                Genre
              </label>
              <select
                id="genre-select"
                {...register('genre')}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
              >
                {genreOptions.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <span className="text-red-500">{errors.genre.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="publicationDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Publication Date
              </label>
              <Controller
                name="publicationDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactDatePicker
                    selected={value}
                    onChange={(date: Date | null) => {
                      onChange(date!);
                    }}
                    placeholderText="Start Date"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    required
                  />
                )}
                rules={{ required: 'Publication Date is required' }}
              />
              {errors.publicationDate && (
                <span className="text-red-500">
                  {errors.publicationDate.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isButtonDisabled || isLoading || isSuccess}
                className="px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateBook;
