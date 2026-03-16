import { useState, useEffect, useRef } from 'react';
import { Send, PawPrint, Dog } from 'lucide-react'; // Using icons for avatars

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Frankie', text: 'Yip yip! Hi there! I\'m Frankie! 🐾', type: 'frankie' },
        { id: 2, sender: 'Henry', text: 'And I\'m Henry. Would you like to hear about our adventures? Or maybe you have a snack? 🦴', type: 'henry' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMsg = { id: Date.now(), sender: 'You', text: inputValue, type: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock response logic
        setTimeout(() => {
            const responses = [
                { sender: 'Frankie', text: 'That sounds exciting! Wanna race? 🏁', type: 'frankie' },
                { sender: 'Henry', text: 'Did someone say sausage? No? Just checking. 🌭', type: 'henry' },
                { sender: 'Frankie', text: 'We love making new friends! 🐶', type: 'frankie' },
                { sender: 'Henry', text: 'Let\'s explore the Wild Place together!', type: 'henry' }
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { ...randomResponse, id: Date.now() + 1 }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <section className="section chat-section bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, #F0F9FF, #FFFDF7)' }}>
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="heading-lg">Chat with Frankie & Henry!</h2>
                    <p className="subheading">Ask them about their favorite animals, the Wild Place, or just say hello.</p>
                </div>

                <div className="chat-interface">
                    <div className="chat-window">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} msg={msg} />
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Type a message to the pups..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-btn" onClick={handleSend}>
                            <Send size={20} />
                        </button>
                    </div>
                    <p className="chat-disclaimer">AI-powered chat. Responses may vary. Safe for kids.</p>
                </div>
            </div>
        </section>
    );
}

function ChatMessage({ msg }) {
    const isUser = msg.type === 'user';
    const isFrankie = msg.type === 'frankie';

    return (
        <div className={`message-row ${isUser ? 'message-right' : 'message-left'}`}>
            {!isUser && (
                <div className="avatar">
                    {isFrankie ? '🐶' : '🐕'}
                </div>
            )}
            <div className={`message-bubble ${msg.type}`}>
                {!isUser && <span className="message-sender">{msg.sender}: </span>}
                {msg.text}
            </div>
        </div>
    );
}
