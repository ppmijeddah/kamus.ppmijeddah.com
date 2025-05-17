import React from "react";

interface HighlightTextProps {
  text: string;
  query: string;
}

export function HighlightText({ text, query }: HighlightTextProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${query.trim()})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        return regex.test(part) ? (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-700">
            {part}
          </span>
        ) : (
          <span className="whitespace-pre" key={index}>{`${part}`}</span>
        );
      })}
    </>
  );
}
