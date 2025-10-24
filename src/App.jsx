import { useState } from "react";
import "./App.css";
import Answer from "./components/Answer";
import ChatHistory from "./components/ChatHistory"; // <-- create this
import { Loader } from "lucide-react"; // simple loading icon

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const askQuestion = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer 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",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: query }],
        }),
      });

      const data = await response.json();
      let answer = data?.choices?.[0]?.message?.content || "No response";

      // fix formatting
      answer = answer
        .replace(/(###)/g, "\n$1")
        .replace(/(\d+\.)/g, "\n$1")
        .replace(/(-\s)/g, "\n$1");

      const formatted = answer
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter((b) => b.length > 0);

      setResult(formatted);
      setHistory((prev) => [...prev, { query, response: formatted }]);
    } catch (error) {
      console.error(error);
      setResult(["Error fetching response."]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const deleteChat = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Left sidebar */}
      <div className="w-1/4 bg-zinc-800 border-r border-zinc-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Chat History</h2>
        <ChatHistory history={history} onDelete={deleteChat} />
      </div>

      {/* Main chat section */}
      <div className="flex flex-col w-3/4 p-6 relative">
        <div className="flex-1 overflow-y-auto space-y-4 mb-20 text-left">
          {loading ? (
            <div className="flex items-center text-gray-400">
              <Loader className="animate-spin mr-2" size={18} />
              thinking…
            </div>
          ) : result.length > 0 ? (
            result.map((item, index) => <Answer ans={item} key={index} />)
          ) : (
            <p className="text-gray-500 italic text-center mt-10">
              hey! how can i help you today?
            </p>
          )}
        </div>

        {/* Input box fixed at bottom */}
        <div className="absolute bottom-4 left-6 right-6 flex items-center bg-zinc-800 rounded-3xl border border-zinc-600 overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-4 bg-transparent outline-none text-white"
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          />
          <button
            onClick={askQuestion}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-3xl font-medium transition-all"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
