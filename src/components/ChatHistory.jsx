import { Trash2, MessageSquare } from "lucide-react";

const ChatHistory = ({
  history,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      {history.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No chats yet
        </p>
      ) : (
        history.map((chat, index) => (
          <div
            key={index}
            className="group bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-3 cursor-pointer flex items-center justify-between"
          >
            <div
              onClick={() => onSelect(chat)}
              className="flex items-center gap-2 overflow-hidden flex-1"
            >
              <MessageSquare size={16} />

              <span className="truncate text-sm">
                {chat.title}
              </span>
            </div>

            <button
              onClick={() => onDelete(index)}
              className="opacity-0 group-hover:opacity-100 transition hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatHistory;