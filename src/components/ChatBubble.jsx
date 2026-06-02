import Answer from "./Answer";

const ChatBubble = ({
  message,
}) => {

  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`rounded-3xl px-5 py-4 max-w-[90%] md:max-w-4xl ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-800 border border-zinc-700"
        }`}
      >
        {isUser ? (
          <p>
            {message.content}
          </p>
        ) : (
          <Answer
            ans={message.content}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;