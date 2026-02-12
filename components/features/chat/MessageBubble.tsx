import { cn } from "../../../lib/utils";

interface MessageBubbleProps {
  isMe: boolean;
  username: string;
  content: string;
  timestamp: string;
}

export const MessageBubble = ({ isMe, username, content, timestamp }: MessageBubbleProps) => {
  return (
    <div className={cn("flex flex-col w-full mb-2", isMe ? "items-end" : "items-start")}>
      
      {/* 1. Username Label (Only for others) */}
      {!isMe && (
        <span className="text-[12px] text-amber-200/70 ml-2 mb-1 font-normal">
          @{username}
        </span>
      )}

      {/* 2. The Bubble */}
      <div 
        className={cn(
          "max-w-[75%] px-3 py-2 rounded-2xl relative shadow-sm",
          isMe 
            ? "bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-tr-sm" 
            : "bg-white/10 text-white rounded-tl-sm border border-white/5"
        )}
      >
        <div className="flex flex-wrap items-end gap-x-2 gap-y-0">
          
          {/* Content: Clean font, slightly smaller size */}
          <p className={cn(
            "text-[13px] leading-snug break-words font-normal tracking-wide",
             isMe ? "text-slate-900" : "text-slate-100"
          )}>
            {content}
          </p>

          {/* Timestamp: Flows naturally at the end */}
          <span className={cn(
            "text-[9px] min-w-fit mt-1 ml-auto select-none",
            isMe ? "text-slate-700/60" : "text-white/40"
          )}>
            {timestamp}
          </span>
          
        </div>
      </div>
    </div>
  );
};