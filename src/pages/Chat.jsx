import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Robot, PaperPlaneRight, Sparkle, User } from '@phosphor-icons/react';
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
        <div className="flex flex-col h-full w-full bg-slate-50 relative">
            
            <div className="px-4 md:px-6 py-3 bg-white border-b border-slate-200 flex justify-between items-center z-20 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                            <Robot size={24} weight="fill" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 bg-white p-0.5 rounded-full">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-base md:text-lg tracking-tight flex items-center gap-1.5">
                            Nutrisi.AI <Sparkle weight="fill" className="text-amber-400" size={16} />
                        </h3>
                        <p className="text-[11px] md:text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Online - Medical Assistant
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-[#f0f2f5]">
                
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full opacity-60 space-y-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-300">
                            <Robot size={40} weight="duotone" />
                        </div>
                        <div className="text-center space-y-2">
                            <h4 className="text-lg font-bold text-slate-700">Mulai Konsultasi</h4>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto">Tanyakan menu diet, kalori, atau tips kesehatan.</p>
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[90%] md:max-w-[70%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end mb-1 border border-white/50 shadow-sm
                                ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                                {msg.sender === 'user' ? <User size={16} weight="bold" /> : <Robot size={16} weight="bold" />}
                            </div>

                            <div className={`group relative px-5 py-3 text-[14px] md:text-[15px] leading-relaxed shadow-sm
                                ${msg.sender === 'user' 
                                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                                    : 'bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100'}`}>
                                
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
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 self-end mb-1">
                                <Robot size={16} weight="bold" />
                            </div>
                            <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 md:p-4 bg-white border-t border-slate-200 z-20">
                <form onSubmit={handleSend} className="relative flex items-center gap-2 md:gap-3 max-w-5xl mx-auto w-full">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={loading}
                        className="w-full bg-slate-100 pl-5 pr-14 py-3.5 rounded-full border-0 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-700 font-normal placeholder:text-slate-400"
                        placeholder="Ketik pesan..."
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                    >
                        <PaperPlaneRight size={20} weight="fill" />
                    </button>
                </form>
            </div>
        </div>
    );
}