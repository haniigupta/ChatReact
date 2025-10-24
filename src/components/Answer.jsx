const Answer = ({ ans }) => {
  const lines = ans.split(/\n/).filter((line) => line.trim().length > 0);

  const elements = [];
  let currentList = [];

  const pushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={Math.random()} className="list-disc list-inside ml-4 space-y-1">
          {currentList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("###")) {
      pushList();
      const heading = trimmed.replace(/^###\s*/, "");
      elements.push(
        <h2 key={i} className="text-lg font-bold mt-4 mb-2 text-blue-400">
          {heading}
        </h2>
      );
    } else if (/^(\d+[\).\s]|[-•])/.test(trimmed)) {
      currentList.push(trimmed.replace(/^(\d+[\).\s]|[-•])\s*/, ""));
    } else {
      pushList();
      elements.push(
        <p key={i} className="text-gray-200 mb-2 leading-relaxed">
          {trimmed}
        </p>
      );
    }
  });

  pushList();

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl shadow-sm leading-relaxed">
      {elements}
    </div>
  );
};

export default Answer;
