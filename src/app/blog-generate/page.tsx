"use client";

import Head from "next/head";
import React, { useState } from "react";

const BlogGenerate = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Generating blog with prompt: ", prompt);
  };

  return (
    <div>
      <Head>
        <title>Generate Blog</title>
        <meta name="description" content="Generate blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        className="flex h-[100vh] flex-col items-center justify-center"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          className="w-1/2 rounded-md border border-gray-300 px-5 py-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button
          type="submit"
          className="mt-5 rounded-md bg-blue-600 px-5 py-2 text-white"
        >
          Generate Blog
        </button>
      </form>
    </div>
  );
};

export default BlogGenerate;
