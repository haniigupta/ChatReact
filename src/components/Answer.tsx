import { useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Copy, Check } from "lucide-react";

interface AnswerProps {
  ans: string;
}

const Answer = ({ ans }: AnswerProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyAnswer = () => {
    navigator.clipboard.writeText(ans);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

    toast.success("Copied");
  };

  return (
    <div>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{ans}</ReactMarkdown>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-700">
        <button
          onClick={copyAnswer}
          className="flex items-center gap-2 text-zinc-400 hover:text-blue-400"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy Response"}</span>
        </button>
      </div>
    </div>
  );
};

export default Answer;