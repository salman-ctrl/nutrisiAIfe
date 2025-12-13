import { Sparkle, Camera, ChatCenteredText, Drop, Brain, Heart, ShieldCheck } from '@phosphor-icons/react';

export default function About() {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                        <Sparkle weight="fill" className="text-yellow-300" /> Kenalan Yuk!
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        Nutrisi.AI: Sahabat Sehat <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Berbasis Artificial Intelligence</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                        Aplikasi pintar yang mengubah cara kamu melihat makanan. Tidak perlu ribet, cukup foto, dan biarkan AI kami menganalisis gizi kamu setara standar medis.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                        <Heart weight="fill" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Peduli Kesehatanmu</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Kami ingin mahasiswa & pengguna umum sadar bahwa makan sehat itu tidak harus membosankan atau sudah.
                    </p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                        <Brain weight="fill" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Teknologi Cerdas</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Menggunakan Deep Learning (YOLOv8) untuk mendeteksi makanan secara akurat dalam hitungan detik.
                    </p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                        <ShieldCheck weight="fill" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Data Terpercaya</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Database nutrisi kami dikurasi dari sumber terpercaya (TKPI & USDA) untuk memastikan akurasi hitungan.
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-sm">#</span>
                    Cara Menggunakan Fitur
                </h2>
                <div className="space-y-4">
                    <div className="group flex flex-col md:flex-row gap-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:border-blue-300 transition-all">
                        <div className="flex-none w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            <Camera weight="duotone" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">1. Scan Makanan</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Bingung berapa kalori makan siangmu? Buka menu <strong>Scan</strong>, arahkan kamera ke makanan, dan <em>voila!</em> AI akan memberitahu nama makanan, total kalori, protein, hingga kadar gulanya. Jangan lupa simpan ke jurnal ya!
                            </p>
                        </div>
                    </div>

                    <div className="group flex flex-col md:flex-row gap-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:border-purple-300 transition-all">
                        <div className="flex-none w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            <ChatCenteredText weight="duotone" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">2. Konsultasi AI (Chat)</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Punya pertanyaan spesifik? <em>"Apakah nasi padang aman buat diet?"</em> atau <em>"Buatkan meal plan 1500 kalori"</em>. Tanyakan apa saja ke asisten AI kami. Dia ramah dan berpengetahuan luas lho!
                            </p>
                        </div>
                    </div>

                    <div className="group flex flex-col md:flex-row gap-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:border-sky-300 transition-all">
                        <div className="flex-none w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            <Drop weight="duotone" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">3. Pantau Hidrasi</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Di halaman <strong>Dashboard</strong>, kamu bisa mencatat jumlah air yang kamu minum. Jangan sampai dehidrasi! Targetkan minimal 8 gelas sehari agar fokus belajarmu tetap terjaga.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-8">
                <p className="text-slate-400 font-medium italic">
                    "Kesehatan adalah investasi terbaik untuk masa depanmu."
                </p>
                <p className="text-slate-300 text-sm mt-2 font-bold">
                    Developed by floverse
                </p>
            </div>
        </div>
    );
}