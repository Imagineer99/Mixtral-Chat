'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Neural Novel</div>
        {/* Add additional navigation items as needed */}
        
        {/* Donate button */}
        <a
          href="https://streamlabs.com/neuralnovels/tip"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Donate
        </a>
      </div>
    </nav>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showLabel, setShowLabel] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowLabel(false);
      setShowTitle(false);
    }
  };

  return (
    <div>
      {/* Include the Navbar component */}
      
      <Navbar />

      {/* Rest of your Chat component */}
      <div className="mx-auto w-full max-w-md py-24 flex flex-col items-center">
        <h1
          style={{
            opacity: showTitle ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Mixtral Chat
        </h1>
        
        {messages.map((m) => (
          <div key={m.id}>
            <span style={{ fontWeight: 'bold' }}>
              {m.role === 'user' ? 'User: ' : 'Mixtral: '}
            </span>
            <span>{m.content}</span>
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label>
            <span
              className={`${
                showLabel ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500 ease-in-out`}
            >
              Say something...
            </span>
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
