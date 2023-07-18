import React from 'react';
import Container from '../ui/Container';
import { TypeOf, z, ZodType } from 'zod';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IBookComment } from '../../redux/features/api/type';
import {
  useCreateReviewMutation,
  useGetReviewsByIdQuery,
} from '../../redux/features/auth/authApi';

const commentSchema: ZodType<IBookComment> = z.object({
  comment: z.string().min(3, { message: 'Content is too short' }),
});

export type BookCommentForm = TypeOf<typeof commentSchema>;

const CommentBox: React.FC<{
  bookId: string;
}> = ({ bookId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookComment>({
    resolver: zodResolver(commentSchema),
  });

  const [createReview, { data, isLoading, isSuccess, isError }] =
    useCreateReviewMutation();
  const {
    data: reviewsData,
    isFetching,
    isLoading: reviewsLoading,
  } = useGetReviewsByIdQuery(bookId as string);
  const reviews = reviewsData?.data;

  const onSubmit = (data: BookCommentForm) => {
    const newData = { ...data, bookId };
    createReview(newData);
    reset();
  };

  if (isSuccess && !isFetching) {
    toast.success(data?.message, {
      autoClose: 2000,
      toastId: Math.random(),
    });
  }
  if (isError) {
    toast.error('Something Went Wrong', {
      autoClose: 2000,
      toastId: Math.random(),
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            {...register('comment')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            rows={4}
            required
          ></textarea>
          {errors.comment && <p>{errors.comment.message}</p>}
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading || isSuccess}
            type="submit"
            className="px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
          >
            Add Comment
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Comments</h3>
        {reviewsLoading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : isFetching ? (
          <p className="text-gray-500">Fetching reviews...</p>
        ) : Array.isArray(reviews) && reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review._id} className="mb-4">
                <p className="font-medium">Comment: {review.comment}</p>
                <p className="font-medium">Author: {review.user.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </Container>
  );
};

export default CommentBox;
