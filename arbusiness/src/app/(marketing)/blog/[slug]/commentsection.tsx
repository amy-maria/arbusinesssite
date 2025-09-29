"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: number;
  author_name: string;
  content: { rendered: string };
  parent: number;
}

interface CommentsSectionProps {
  postId: number;
  wpBaseUrl: string; // e.g., "https://your-wp-site.com"
}

export default function CommentsSection({ postId, wpBaseUrl }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Fetch approved comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/comments?post=${postId}&status=approve`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Submit new top-level comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitComment(name, email, content);
    setName("");
    setEmail("");
    setContent("");
  };

  // Submit a reply to a comment
  const handleReply = async (parentId: number) => {
    await submitComment(name, email, replyContent, parentId);
    setReplyingTo(null);
    setReplyContent("");
  };

  const submitComment = async (author_name: string, author_email: string, commentContent: string, parent?: number) => {
    const payload: any = {
      post: postId,
      author_name,
      author_email,
      content: commentContent,
    };
    if (parent) payload.parent = parent;

    try {
      const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(parent ? "Reply submitted for moderation." : "Comment submitted for moderation.");
        fetchComments();
      } else {
        setMessage("Failed to submit comment/reply.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit comment/reply.");
    }
  };

  // Recursive function to render comments and replies
  const renderReplies = (parentId: number) => {
    const replies = comments.filter(c => c.parent === parentId);
    if (!replies.length) return null;

    return (
      <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
        {replies.map(reply => (
          <li key={reply.id} className="mb-2">
            <p className="font-semibold">{reply.author_name}</p>
            <div dangerouslySetInnerHTML={{ __html: reply.content.rendered }} />

            {/* Reply button */}
            <button
              onClick={() => setReplyingTo(reply.id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              Reply
            </button>

            {/* Reply form */}
            {replyingTo === reply.id && (
              <div className="mt-2">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <textarea
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder="Reply"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <button
                  onClick={() => handleReply(reply.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}

            {/* Nested replies */}
            {renderReplies(reply.id)}
          </li>
        ))}
      </ul>
    );
  };

  const topLevelComments = comments.filter(c => c.parent === 0);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Top-level comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="border px-3 py-2 rounded"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Comment"
          required
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Submit Comment
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>

      {/* Comment list */}
      <ul>
        {topLevelComments.map(comment => (
          <li key={comment.id} className="mb-4">
            <p className="font-semibold">{comment.author_name}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              Reply
            </button>
            {replyingTo === comment.id && (
              <div className="mt-2">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <textarea
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder="Reply"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}
            {renderReplies(comment.id)}
          </li>
        ))}
      </ul>
    </div>
  );
}
