import React, { useState } from "react";
import "./styles.css";

// Mock Comment Data (initial state)
const mockComments = [
    {
        id: 1,
        text: "Happy New Year folks! What are your resolutions this year?",
        replies: [
            {
                id: 2,
                text: "Same to you. I am planning to join a gym.",
                replies: [
                    {
                        id: 3,
                        text: "I tried last year and gave up.",
                        replies: [
                            {
                                id: 4,
                                text: "Good on you, nothing is more important than good health.",
                                replies: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// Counter for generating unique IDs (starting from last mock comment id)
let idCounter = 4;

export default function CommentApp() {
    const [comments, setComments] = useState(mockComments);
    const [newComment, setNewComment] = useState("");

    // Function to add a reply to any nested comment
    const addReply = (id, text) => {
        const addNestedReply = (commentList) => {
            return commentList.map((comment) => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            { id: ++idCounter, text, replies: [] },
                        ],
                    };
                }
                return {
                    ...comment,
                    replies: addNestedReply(comment.replies),
                };
            });
        };

        setComments(addNestedReply(comments));
    };

    // Function to add a top-level comment
    const addComment = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                { id: ++idCounter, text: newComment, replies: [] },
            ]);
            setNewComment("");
        }
    };

    // Recursive Comment Component
    const Comment = ({ comment }) => {
        const [showReplyInput, setShowReplyInput] = useState(false);
        const [replyText, setReplyText] = useState("");

        const handleReply = () => {
            if (replyText.trim()) {
                addReply(comment.id, replyText);
                setReplyText("");
                setShowReplyInput(false);
            }
        };

        return (
            <div className="comment" data-testid={`comment-${comment.id}`}>
                <div>{comment.text}</div>
                <button
                    className="reply-btn"
                    data-testid={`reply-btn-${comment.id}`}
                    onClick={() => setShowReplyInput(!showReplyInput)}
                >
                    Add a reply
                </button>

                {showReplyInput && (
                    <div className="reply-box">
                        <input
                            type="text"
                            value={replyText}
                            data-testid={`reply-input-${comment.id}`}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply..."
                        />
                        <button
                            data-testid={`submit-reply-${comment.id}`}
                            onClick={handleReply}
                        >
                            Submit
                        </button>
                    </div>
                )}

                <div className="replies">
                    {comment.replies.map((reply) => (
                        <Comment key={reply.id} comment={reply} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            <h2>Comment Section</h2>
            <div className="new-comment">
                <input
                    type="text"
                    value={newComment}
                    data-testid="new-comment-input"
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type a comment..."
                />
                <button data-testid="add-comment-btn" onClick={addComment}>
                    Add Comment
                </button>
            </div>

            <div className="comments">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
