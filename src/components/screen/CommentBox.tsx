import React, { useState } from 'react';
import Container from '../ui/Container';

interface IComment {
  id: string;
  content: string;
  author: string;
}

const CommentBox: React.FC = () => {
  const [comment, setComment] = useState<IComment>({
    id: '',
    content: '',
    author: '',
  });
  const [comments, setComments] = useState<IComment[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.content && comment.author) {
      const newComment: IComment = {
        id: Date.now().toString(),
        content: comment.content,
        author: comment.author,
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setComment({
        id: '',
        content: '',
        author: '',
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mt-16">
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Comment
          </label>
          <textarea
            id="content"
            name="content"
            value={comment.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 font-medium mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={comment.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 text-base font-medium text-white rounded-full bg-primary"
          >
            Add Comment
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="mb-4">
                <p className="font-medium">{comment.author}</p>
                <p className="text-gray-700">{comment.content}</p>
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
