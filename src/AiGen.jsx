import React, { useState } from "react";
import { marked } from "marked";

export default function AiGen() {
  const [description, setDescription] = useState("");
  const [submitStatus, setSubmitStatus] = useState("Submit");
  const [recommendedBook, setRecommendedBook] = useState("");

  const responseGenerate = async (inputText) => {
    console.log(inputText);
    const prompt = {
      inputText: inputText,
    };

    const result = await fetch("http://localhost:7071/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    if (result.ok) {
      const aiResponse = await result.json();
      console.log(aiResponse);
      setRecommendedBook(aiResponse.analysis); 
      setSubmitStatus("Submit");
    } else {
      setSubmitStatus("Retry");
    }
  };

  async function submitDescription() {
    setSubmitStatus("Waiting");
    console.log(description);
    responseGenerate(description);
  }

  return (
    <div>
      <header className="bg-gray-800 text-white py-4">
        <h2 className="text-3xl font-bold">Book recommender</h2>
      </header>
      <div className="bg-gray-800 min-h-screen flex flex-col items-center gap-4 py-8">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell me what you want to read"
          className="w-3/4 p-4 border border-gray-300 rounded-md text-black"
        ></textarea>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={submitDescription}
        >
          {submitStatus}
        </button>

        <div
          className=" bg-white rounded-lg p-4 text-lg"
          dangerouslySetInnerHTML={{
            __html: marked(
              recommendedBook || "Your recommendations will appear here"
            ),
          }}
        />

       
      </div>
    </div>
  );
}
