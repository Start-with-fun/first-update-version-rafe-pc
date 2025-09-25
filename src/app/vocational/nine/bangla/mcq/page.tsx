// app/mcq/page.tsx
import { a } from "framer-motion/m";
import React from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  option1: number;
  option2: string;
  option3: string;
  option4: string;
}

async function getQuestions(): Promise<Question[]> {
  const res = await fetch("http://127.0.0.1:8000/mcq/question/", {
    method: "GET",
    cache: "no-store", // disables caching (always fresh)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}

export default async function McqPage() {
  const questions = await getQuestions();
  console.log(questions);
  console.log(questions.map((q) => q.option1));
  console.log(questions[0].correct_answer);


  return (
    <div
      style={{
        backgroundColor: "rgb(18,18,22)",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>MCQ Questions</h1>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div>
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>{q.question}</p>
            </div>
          ))}
        </div>
      )}



      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div>
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <ol>
                <li >{q.option1}</li>
                <li>{q.option2}</li>
                <li>{q.option3}</li>
                <li>{q.option4}</li>
              </ol>
            </div>

            
          ))}
      </div>
      )}
      <form className="text-center" action="">
       <input type="text" className="outline-none" placeholder="Type your Answer (just answer num)"  />
       <br /> <br /> <br />
       <button type="submit">Submit Answer</button>
      
      </form>
    </div>

  );
}
