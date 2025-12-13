import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Robot, PaperPlaneRight, User } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const loadHistory = async () => {
        try {
            const res = await api.get('/chat');
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsgText = input;
        setInput('');

        const tempUserMsg = { sender: 'user', message: userMsgText, id: Date.now() };
        setMessages(prev => [...prev, tempUserMsg]);
        setLoading(true);

        try {
            const res = await api.post('/chat', { message: userMsgText });
            setMessages(prev => [...prev, res.data]);
        } catch (err) {
            setMessages(prev => [...prev, {
                sender: 'ai',
                message: "Maaf, koneksi ke server terputus. Coba refresh halaman atau login ulang.",
                id: Date.now() + 1
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            
           
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full opacity-60 space-y-6">
                        <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                            <Robot size={40} weight="duotone" />
                        </div>
                        <div className="text-center space-y-2 p-4">
                            <h4 className="text-lg font-bold text-slate-800">Mulai Konsultasi</h4>
                            <p className="text-slate-600 text-sm max-w-xs mx-auto">Tanyakan menu diet, kalori, atau tips kesehatan.</p>
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[90%] md:max-w-[75%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end mb-1 shadow-sm
                                ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-blue-600'}`}>
                                {msg.sender === 'user' ? <User size={16} weight="bold" /> : <Robot size={16} weight="bold" />}
                            </div>

                            <div className={`group relative px-5 py-3 text-[14px] md:text-[15px] leading-relaxed shadow-md
                                ${msg.sender === 'user' 
                                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                                    : 'bg-white/90 backdrop-blur-sm text-slate-800 rounded-2xl rounded-tl-sm' 
                                }`}>
                                
                                {msg.sender === 'ai' ? (
                                    <div className="prose prose-sm prose-slate max-w-none 
                                        prose-p:my-1 prose-headings:font-bold prose-headings:text-slate-800 prose-headings:my-1.5
                                        prose-strong:text-slate-900 prose-strong:font-bold
                                        prose-ul:my-1 prose-li:my-0">
                                        <ReactMarkdown>{msg.message}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap font-normal">{msg.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex w-full justify-start">
                        <div className="flex max-w-[75%] gap-3">
                            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 self-end mb-1">
                                <Robot size={16} weight="bold" />
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 z-20 sticky bottom-0">
                <form onSubmit={handleSend} className="relative flex items-center gap-2 max-w-4xl mx-auto w-full">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={loading}
                        className="w-full bg-white/90 backdrop-blur-md pl-5 pr-14 py-4 rounded-full border border-white/50 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-500 shadow-lg"
                        placeholder="Ketik pesan..."
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-md"
                    >
                        <PaperPlaneRight size={20} weight="fill" />
                    </button>
                </form>
            </div>
        </div>
    );
}