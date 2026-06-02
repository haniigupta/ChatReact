const Thinking = () => {
  return (
    <div className="flex justify-start">

      <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-5">

        <div className="flex gap-2">

          <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>

          <span
            className="h-3 w-3 rounded-full bg-purple-500 animate-bounce"
            style={{
              animationDelay: "0.2s",
            }}
          ></span>

          <span
            className="h-3 w-3 rounded-full bg-pink-500 animate-bounce"
            style={{
              animationDelay: "0.4s",
            }}
          ></span>

        </div>

        <p className="text-zinc-400 mt-3 text-sm">
          Thinking...
        </p>

      </div>

    </div>
  );
};

export default Thinking;