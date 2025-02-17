import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const sendMessage = async () => {
    if (!input) return;

    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();
      setMessages([...messages, { role: 'user', text: input }, { role: 'bot', text: data.response }]);
      setInput('');
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      setMessages([...messages, { role: 'error', text: 'Error de conexión' }]);
    }
  };

  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Chatcito v1</h1>
      <h3>Demoro en responder aprox 2 min :/ </h3>
      <h4>Solo funciono si la PC de Cesar esta encendida </h4>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '5px 0', color: msg.role === 'user' ? 'blue' : msg.role === 'bot' ? 'green' : 'red' }}>
            <strong>{msg.role.toUpperCase()}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: '80%', padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer' }}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;
