import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const Answer = ({ ans }) => {
  const copyAnswer = () => {
    navigator.clipboard.writeText(ans);
    toast.success("Copied");
  };

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 relative">

      <button
        onClick={copyAnswer}
        className="absolute right-4 top-4 hover:text-blue-400"
      >
        <Copy size={18} />
      </button>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>
          {ans}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Answer;