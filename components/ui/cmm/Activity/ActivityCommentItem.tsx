'use client';

/**
 * @page: 소모임 - 활동 댓글 아이템 컴포넌트
 * @description: 활동 댓글 아이템 컴포넌트입니다. 댓글 작성자 이름, 작성자 이니셜, 댓글 내용, 작성 시간 등의 정보를 표시하며, 답글 작성 기능을 포함하고 있습니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

export type ActivityReply = {
  id: string;
  authorName: string;
  authorInitial: string;
  content: string;
  createdAtLabel: string;
};

export type ActivityComment = {
  id: string;
  authorName: string;
  authorInitial: string;
  content: string;
  createdAtLabel: string;
  replies: ActivityReply[];
};

type ActivityCommentItemProps = {
  comment: ActivityComment;
  replyValue: string;
  isReplying: boolean;
  onChangeReplyValue: (commentId: string, nextValue: string) => void;
  onToggleReply: (commentId: string) => void;
  onSubmitReply: (commentId: string) => void;
};

function Avatar({
  initial,
  sizeClassName,
  textClassName,
}: {
  initial: string;
  sizeClassName: string;
  textClassName: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#E7F4F3] ${sizeClassName}`}
      aria-hidden="true"
    >
      <span
        className={`font-bold font-hana-main text-hana-main ${textClassName}`}
      >
        {initial}
      </span>
    </div>
  );
}

function ReplyItem({ reply }: { reply: ActivityReply }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar
        initial={reply.authorInitial}
        sizeClassName="h-10 w-10"
        textClassName="text-[16px]"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold font-hana-main text-[#1D3050] text-[16px]">
            {reply.authorName}
          </span>

          <span className="font-hana-main text-[#A0A0A0] text-[14px]">
            {reply.createdAtLabel}
          </span>
        </div>

        <p className="font-hana-main text-[#2F3A4F] text-[16px] leading-[1.5]">
          {reply.content}
        </p>
      </div>
    </div>
  );
}

export default function ActivityCommentItem({
  comment,
  replyValue,
  isReplying,
  onChangeReplyValue,
  onToggleReply,
  onSubmitReply,
}: ActivityCommentItemProps) {
  const handleReplyInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeReplyValue(comment.id, event.target.value);
  };

  const handleReplyKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onSubmitReply(comment.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Avatar
          initial={comment.authorInitial}
          sizeClassName="h-12 w-12"
          textClassName="text-[20px]"
        />

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-bold font-hana-main text-[#1D3050] text-[18px]">
              {comment.authorName}
            </span>

            <span className="font-hana-main text-[#A0A0A0] text-[14px]">
              {comment.createdAtLabel}
            </span>
          </div>

          <p className="font-hana-main text-[#2F3A4F] text-[18px] leading-[1.5]">
            {comment.content}
          </p>

          <button
            type="button"
            onClick={() => onToggleReply(comment.id)}
            className="w-fit font-hana-main font-semibold text-[16px] text-hana-main hover:text-hana-mint"
            aria-label={`${comment.authorName} 댓글에 답글 달기`}
          >
            @답글
          </button>
        </div>
      </div>

      {isReplying ? (
        <div className="ml-15 flex items-center gap-2">
          <input
            type="text"
            value={replyValue}
            onChange={handleReplyInputChange}
            onKeyDown={handleReplyKeyDown}
            placeholder="답글을 입력하세요"
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 font-hana-main text-[#222222] text-[15px] outline-none placeholder:text-[#9CA3AF]"
          />

          <button
            type="button"
            onClick={() => onSubmitReply(comment.id)}
            className="shrink-0 rounded-xl bg-hana-main px-4 py-3 font-hana-main font-semibold text-[14px] text-white hover:bg-hana-mint"
            aria-label="답글 등록"
          >
            등록
          </button>
        </div>
      ) : null}

      {comment.replies.length > 0 ? (
        <div className="ml-15 flex flex-col gap-4 border-[#EAEAEA] border-l pl-4">
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
