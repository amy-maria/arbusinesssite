"use client";

import { useState, useEffect, useCallback} from 'react';
import { request, gql } from "graphql-request";


interface GqlCommentNode {
  databaseId: number;
  //postId: number;
  parentDatabaseId: number | null;
  author: {
    node: {
      name: string | null;

    } | null;
  };
  content: string; 
  date: string;
 }

 interface GetCommentsResponse {
  comments: {
    nodes: GqlCommentNode[];
  };
 }
interface Comment {
  id: number;
  post: number;
  author_name: string;
  content: { rendered: string };
  parent: number;
  date: string;
}


interface CommentsSectionProps {
  postId: number;
  wpBaseUrl: string; // GraphQL endpoint
}
//const wpBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const GET_APPROVED_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(where: 
    { contentId: $postId,
     }) {
      nodes {
        databaseId
        parentDatabaseId
        author {
          node {
            name
          }
        }
        date
        content
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      comment {
      databaseId}
    }
  }
`;

export default function CommentsSection({ postId, wpBaseUrl }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
//comment form, global state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
//reply management state
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
//state for muliple reply forms
  const [ replyFormState, setReplyFormState] = useState<{[parentId: number]: {name: string, email: string, content:string};}>({})  
 //const [replyContent, setReplyContent] = useState("");
  

  // Fetch approved comments
  const fetchComments = useCallback(async () => {
    setLoading(true);
    console.log('Attempting to fetch comments from:', wpBaseUrl);
    try {
      //pass postID as string expected by GraphQL
      const data: GetCommentsResponse = await request(wpBaseUrl, GET_APPROVED_COMMENTS, { postId: String(postId) });

      const formatted = data.comments.nodes.map((c: any) => ({
        id: c.databaseId,
        post: postId,
        parent: c.parentDatabaseId || 0,
        author_name: c.author?.node?.name || "Anonymous",
        date: c.date,
        content: { rendered: c.content },
      }));
      setComments(formatted);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  }, [postId, wpBaseUrl]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  //Helper to manage reply form state changes
  const handleReplyFormChange = (parentId: number, field: 'name' | 'email' | 'content', value:string ) => {
    setReplyFormState(prev => ({
      ...prev, 
      [parentId]: {
        ...prev[parentId],
        [field]: value,
      }
    }));
  };
  // Submit comment/reply
  const submitComment = async (parent?: number) => {
    setSubmitting(true);
    let authorName: string= name;
    let authorEmail: string= email;
    let content: string = commentContent;
    
    //reply submission
    if (parent) {
      const replyData = replyFormState[parent];

      if (!replyData?.name || !replyData?.email || !replyData?.content) {
        alert("Please fill in all fields.");
        setSubmitting(false);
        return;
      }
      authorName = replyData.name;
      authorEmail = replyData.email;
      content = replyData.content;

    } else if (!name || !email || !commentContent) {
      // 2. Logic for a top-level submission validation
      alert("Please fill in all fields for the comment.");
      setSubmitting(false);
      return;
    }


    const payload = {
      commentOn: Number(postId),
      author: authorName,
      authorEmail: authorEmail,
      content: content,
      
      ...(parent && {parent: Number(parent) }), //Only include parent if it's a reply
    };

    try {
      const response = await request(wpBaseUrl, CREATE_COMMENT, { input: payload });
      const { createComment } = response as any;

      console.log("GraphQL response:", response); //FIX: Log the correct response

      if (createComment.success) {
        alert("✅ Your comment has been submitted and is awaiting moderation.");
        if (parent) {
          //clear only specific reply form
          setReplyFormState(prev => {
            const newState = { ...prev };
            delete newState[parent];
            return newState;
          });
        } else {
          //clear main comment form
          setName("");
          setEmail("");
          setCommentContent("");
        }
        setReplyingTo(null);
        //refresh comments list
        await fetchComments();
      }
    } catch (err: any) {
      const serverError = err.response?.errors?.[0]?.message || err.message;
      console.error("Comment submission error:", serverError || err);
      alert(`Failed to submit comment. Server error: ${serverError}`);
      //console.error("Comment submission error:", err.response || err);
      //alert("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitComment();
  };

  const handleReply = async (parentId: number) => {
    await submitComment(parentId);
  };

  // Recursive replies rendering
  const renderReplies = useCallback((parentId: number) => {
    const replies = comments.filter(c => c.parent === parentId);
    if (!replies.length) return null;

    return (
      <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
        {replies.map(reply => (
          <li key={reply.id} className="mb-2">
            <p className="font-semibold">{reply.author_name}</p>
            <div dangerouslySetInnerHTML={{ __html: reply.content.rendered }} />

            <button
              onClick={() => setReplyingTo(reply.id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              Reply
            </button>

            {/* Reply Form using isolated state */}
            {replyingTo === reply.id && (
              <div className="mt-2">
                <input
                  value={replyFormState[reply.id]?.name || name} // Default to main name/email
                  onChange={e => handleReplyFormChange(reply.id, 'name', e.target.value)}
                  placeholder="Name"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <input
                  value={replyFormState[reply.id]?.email || email} // Default to main name/email
                  onChange={e => handleReplyFormChange(reply.id, 'email', e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <textarea
                  value={replyFormState[reply.id]?.content || ''}
                  onChange={e => handleReplyFormChange(reply.id, 'content', e.target.value)}
                  placeholder="Reply"
                  required
                  className="border px-2 py-1 rounded mb-1"
                />
                <button
                  onClick={() => handleReply(reply.id)}
                  disabled={submitting || !replyFormState[reply.id]?.name || !replyFormState[reply.id]?.email}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}

            {renderReplies(reply.id)}
          </li>
        ))}
      </ul>
    );
  }, [comments, replyingTo, submitting, handleReply, replyFormState, name, email]); //Dependencies for useCallback hook

  if (loading) return <p>Loading comments...</p>;

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
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          placeholder="Comment"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Comment
        </button>
      </form>

      {/* Render top-level comments */}
      <ul>
        {comments.filter(c => c.parent === 0).map(comment => (
          <li key={comment.id} className="mb-4">
            <p className="font-semibold">{comment.author_name}</p>
             <p className="font-semibold">{new Date(comment.date).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              Reply
            </button>
           
            {/* Top-Level Reply Form using isolated state */}
            { replyingTo === comment.id && (
            <div className="mt-2 flex flex-col gap-1">
                <input
                  value={replyFormState[comment.id]?.name || name}
                  onChange={e => handleReplyFormChange(comment.id, 'name', e.target.value)}
                  placeholder="Name"
                  required
                  className="border px-2 py-1 rounded"
                />
                <input
                  value={replyFormState[comment.id]?.email || email}
                  onChange={e => handleReplyFormChange(comment.id, 'email', e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                  className="border px-2 py-1 rounded"
                />
                <textarea
                  value={replyFormState[comment.id]?.content || ''}
                  onChange={e => handleReplyFormChange(comment.id, 'content', e.target.value)}
                  placeholder="Write your reply ..."
                  required
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  disabled={submitting || !replyFormState[comment.id]?.content || !replyFormState[comment.id]?.name || !replyFormState[comment.id]?.email}
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
