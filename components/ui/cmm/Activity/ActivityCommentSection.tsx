'use client';

import { useMemo, useState } from 'react';

import ActivityCommentItem, {
  type ActivityComment,
  type ActivityReply,
} from '@/components/ui/cmm/Activity/ActivityCommentItem';

/**
 * @page: 소모임 - 활동 댓글 섹션 컴포넌트
 * @description: 활동 댓글 섹션 컴포넌트입니다. 댓글 리스트와 댓글 입력 필드로 구성되어 있습니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

const INITIAL_COMMENTS: ActivityComment[] = [
  {
    id: 'comment-1',
    authorName: '최진수',
    authorInitial: '최',
    content: '좋은 모임이네요 기대됩니다!',
    createdAtLabel: '1일 전',
    replies: [],
  },
];

function createReply(authorName: string, content: string): ActivityReply {
  return {
    id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    authorName,
    authorInitial: authorName.slice(0, 1),
    content,
    createdAtLabel: '방금 전',
  };
}

function createComment(authorName: string, content: string): ActivityComment {
  return {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    authorName,
    authorInitial: authorName.slice(0, 1),
    content,
    createdAtLabel: '방금 전',
    replies: [],
  };
}

export default function ActivityCommentSection() {
  const [comments, setComments] = useState<ActivityComment[]>(INITIAL_COMMENTS);
  const [commentValue, setCommentValue] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyValues, setReplyValues] = useState<Record<string, string>>({});

  const commentCountLabel = useMemo(() => {
    return `댓글 ${comments.length}개`;
  }, [comments.length]);

  const handleToggleReply = (commentId: string) => {
    setReplyTargetId((previousId) => {
      if (previousId === commentId) {
        return null;
      }

      return commentId;
    });
  };

  const handleChangeReplyValue = (commentId: string, nextValue: string) => {
    setReplyValues((previousValues) => ({
      ...previousValues,
      [commentId]: nextValue,
    }));
  };

  const handleSubmitReply = (commentId: string) => {
    const trimmedReplyValue = (replyValues[commentId] ?? '').trim();

    if (!trimmedReplyValue) {
      return;
    }

    setComments((previousComments) =>
      previousComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        return {
          ...comment,
          replies: [
            ...comment.replies,
            createReply('김하나', trimmedReplyValue),
          ],
        };
      }),
    );

    setReplyValues((previousValues) => ({
      ...previousValues,
      [commentId]: '',
    }));
    setReplyTargetId(null);
  };

  const handleSubmitComment = () => {
    const trimmedCommentValue = commentValue.trim();

    if (!trimmedCommentValue) {
      return;
    }

    setComments((previousComments) => [
      ...previousComments,
      createComment('김하나', trimmedCommentValue),
    ]);
    setCommentValue('');
  };

  const handleCommentKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    handleSubmitComment();
  };

  return (
    <section
      className="w-full rounded-[24px] bg-white p-6"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-bold font-hana-main text-[#1D3050] text-[18px]">
          {commentCountLabel}
        </h2>

        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <ActivityCommentItem
              key={comment.id}
              comment={comment}
              replyValue={replyValues[comment.id] ?? ''}
              isReplying={replyTargetId === comment.id}
              onChangeReplyValue={handleChangeReplyValue}
              onToggleReply={handleToggleReply}
              onSubmitReply={handleSubmitReply}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentValue}
            onChange={(event) => setCommentValue(event.target.value)}
            onKeyDown={handleCommentKeyDown}
            placeholder="댓글을 입력하세요"
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 font-hana-main text-[#222222] text-[16px] outline-none placeholder:text-[#9CA3AF]"
          />

          <button
            type="button"
            onClick={handleSubmitComment}
            className="shrink-0 rounded-xl bg-hana-main px-4 py-3 font-hana-main font-semibold text-[14px] text-white hover:bg-hana-mint"
            aria-label="댓글 등록"
          >
            등록
          </button>
        </div>
      </div>
    </section>
  );
}
