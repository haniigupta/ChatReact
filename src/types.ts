export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Chat {
  title: string;
  query: string;
  messages: Message[];
  createdAt: number;
}

export interface GroqResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}