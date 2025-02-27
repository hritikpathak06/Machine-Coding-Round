import React, { useState } from "react";
import "./index.css";

const faq_data = [
  {
    id: 1,
    title: "What is your name",
    description: "Lorem ipsum dolor sit amet consectetur...",
  },
  {
    id: 2,
    title: "How are you",
    description: "Lorem ipsum dolor sit amet consectetur...",
  },
  {
    id: 3,
    title: "What is Your Profession",
    description: "Lorem ipsum dolor sit amet consectetur...",
  },
  {
    id: 4,
    title: "What is your Business",
    description: "Lorem ipsum dolor sit amet consectetur...",
  },
  {
    id: 5,
    title: "What is your ambition",
    description: "Lorem ipsum dolor sit amet consectetur...",
  },
];

const SingleFaq = ({
  val,
  isExpanded,
  onToggle,
}: {
  val: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="single_faq">
      <h3 onClick={onToggle}>{val.title}</h3>
      {isExpanded && (
        <div>
          <span>{val.description}</span>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="container">
      <h1>FAQ</h1>
      {faq_data.map((f) => (
        <SingleFaq
          key={f.id}
          val={f}
          isExpanded={expandedId === f.id}
          onToggle={() => handleToggle(f.id)}
        />
      ))}
    </div>
  );
};

export default Faq;
