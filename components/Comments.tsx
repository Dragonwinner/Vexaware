"use client";

import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsProps {
  pageId: string;
}

export default function Comments({ pageId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alex Chen",
      avatar: "AC",
      content: "Great tutorial! The step-by-step approach made it really easy to understand VEX documents.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 2,
          author: "Sarah Johnson",
          avatar: "SJ",
          content: "I agree! The code examples were particularly helpful.",
          timestamp: "1 hour ago",
        }
      ]
    },
    {
      id: 3,
      author: "Michael Rodriguez",
      avatar: "MR",
      content: "Question: How does this integrate with existing CI/CD pipelines? Any examples available?",
      timestamp: "4 hours ago",
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "YO",
      content: newComment,
      timestamp: "Just now",
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const addReply = (commentId: number) => {
    if (!replyText.trim()) return;

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "You",
              avatar: "YO",
              content: replyText,
              timestamp: "Just now"
            }
          ]
        };
      }
      return comment;
    }));

    setReplyText("");
    setReplyTo(null);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {comment.avatar}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {comment.content}
            </p>
          </div>
          {!isReply && (
            <button
              onClick={() => setReplyTo(comment.id)}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reply
            </button>
          )}
          {replyTo === comment.id && (
            <div className="mt-3 ml-12">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => addReply(comment.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplyText("");
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="my-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Community Discussion ({comments.length})
      </h2>

      {/* Add Comment */}
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts, ask questions, or provide feedback..."
          className="w-full p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={4}
        />
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 Be respectful and constructive in your comments
          </p>
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}
