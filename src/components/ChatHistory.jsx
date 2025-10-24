import { Trash2 } from "lucide-react";

const ChatHistory = ({ history, onDelete }) => {
  return (
    <div className="space-y-2">
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">No chats yet.</p>
      ) : (
        history.map((chat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-zinc-700 rounded-lg p-2 hover:bg-zinc-600 transition"
          >
            <p className="truncate text-sm w-3/4">{chat.query}</p>
            <button
              onClick={() => onDelete(index)}
              className="p-1 hover:text-red-400"
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
