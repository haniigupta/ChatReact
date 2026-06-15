import React from "react";

interface ChatInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  askQuestion: () => Promise<void>;
  loading: boolean;
}

const ChatInput = ({
  query,
  setQuery,
  askQuestion,
  loading,
}: ChatInputProps) => {
  return (
    <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 rounded-3xl p-2 md:p-3 flex gap-2">
      <textarea
        rows={1}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Ask anything..."
        className="flex-1 bg-transparent resize-none outline-none text-white"
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            askQuestion();
          }
        }}
      />

      <button
        disabled={loading}
        onClick={askQuestion}
        className="px-3 md:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;