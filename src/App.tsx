
import { Menu, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import ChatBubble from "./components/ChatBubble";

import { askGroq } from "./utils/api";
import { useLocalStorage } from "./hooks/useLocalStorage";

import type { Message, Chat } from "./types";

function App() {
  const [showSidebar, setShowSidebar] =
    useState<boolean>(false);

  const [query, setQuery] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [history, setHistory] =
    useLocalStorage<Chat[]>(
      "chat-history",
      []
    );

  const askQuestion = async (): Promise<void> => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const userMessage: Message = {
        role: "user",
        content: query,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      const answer =
        await askGroq(query);

      const aiMessage: Message = {
        role: "assistant",
        content: answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      const chat: Chat = {
        title:
          query.length > 30
            ? query.slice(0, 30) + "..."
            : query,

        query,

        messages: [
          userMessage,
          aiMessage,
        ],

        createdAt: Date.now(),
      };

      setHistory([
        chat,
        ...history,
      ]);

      setQuery("");

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const deleteChat = (
    index: number
  ): void => {

    setHistory(
      history.filter(
        (_: Chat, i: number) =>
          i !== index
      )
    );
  };

  const loadChat = (
    chat: Chat
  ): void => {

    setMessages(
      chat.messages
    );
  };

  const newChat = (): void => {

    setMessages([]);
    setQuery("");
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen flex bg-zinc-950 text-white">

        {/* Desktop Sidebar */}

        <div
          className="
            hidden
            md:flex
            md:w-80
            border-r
            border-zinc-800
            bg-zinc-950
            p-4
            flex-col
            overflow-y-auto
          "
        >
          <button
            onClick={newChat}
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              rounded-xl
              p-3
              transition
            "
          >
            <Plus size={18} />
            New Chat
          </button>

          <ChatHistory
            history={history}
            onDelete={deleteChat}
            onSelect={loadChat}
          />
        </div>

        {/* Mobile Sidebar */}

        {showSidebar && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="
              fixed
              left-0
              top-0
              h-screen
              w-72
              bg-zinc-950
              z-50
              border-r
              border-zinc-800
              p-4
            "
          >
            <button
              onClick={() =>
                setShowSidebar(false)
              }
              className="mb-4"
            >
              <X />
            </button>

            <ChatHistory
              history={history}
              onDelete={deleteChat}
              onSelect={loadChat}
            />
          </motion.div>
        )}

        {/* Main Content */}

        <div className="flex flex-col flex-1 p-4 md:p-6">

          <div className="flex items-center gap-3 mb-8">

            <button
              onClick={() =>
                setShowSidebar(true)
              }
              className="
                md:hidden
                bg-zinc-800
                p-2
                rounded-lg
              "
            >
              <Menu size={22} />
            </button>

            <div>
              <h1
                className="
                  text-3xl
                  md:text-5xl
                  font-extrabold
                  bg-gradient-to-r
                  from-blue-500
                  via-purple-500
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                ChatReact AI
              </h1>
            </div>

          </div>

          <div className="flex-1 overflow-y-auto">

            {messages.length > 0 ? (

              <div className="space-y-4">

                {messages.map(
                  (
                    message: Message,
                    index: number
                  ) => (
                    <ChatBubble
                      key={index}
                      message={message}
                    />
                  )
                )}

                {loading && (

                  <div className="flex">

                    <div
                      className="
                        bg-zinc-800
                        border
                        border-zinc-700
                        rounded-3xl
                        px-5
                        py-4
                      "
                    >
                      <div className="flex gap-2">

                        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>

                        <span
                          className="h-3 w-3 rounded-full bg-purple-500 animate-bounce"
                          style={{
                            animationDelay:
                              "0.2s",
                          }}
                        />

                        <span
                          className="h-3 w-3 rounded-full bg-pink-500 animate-bounce"
                          style={{
                            animationDelay:
                              "0.4s",
                          }}
                        />

                      </div>

                    </div>

                  </div>

                )}

              </div>

            ) : (

              <div className="flex flex-col items-center justify-center h-full">

                <div
                  className="
                    h-20
                    w-20
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-purple-500
                    mb-6
                  "
                />

                <h2 className="text-3xl font-bold">
                  Welcome to ChatReact AI
                </h2>

                <p className="text-zinc-500 mt-3">
                  Ask questions,
                  generate ideas,
                  and explore concepts.
                </p>

              </div>

            )}

          </div>

          <ChatInput
            query={query}
            setQuery={setQuery}
            askQuestion={askQuestion}
            loading={loading}
          />

        </div>

      </div>
    </>
  );
}

export default App;

