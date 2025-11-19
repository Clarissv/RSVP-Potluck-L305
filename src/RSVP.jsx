import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Utensils, Heart, CheckCircle, Plus, User, Coffee, Pizza, Cake, Trash2 } from 'lucide-react';

export default function PotluckInvite() {
  // State untuk daftar peserta dan menu (Simulasi database)
  const [participants, setParticipants] = useState([]);

  // State untuk form input
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    category: 'main'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('invite'); // 'invite' or 'list'

  // Handle perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.item) {
      const newParticipant = {
        id: participants.length + 1,
        ...formData
      };
      setParticipants([newParticipant, ...participants]);
      setIsSubmitted(true);
      
      // Reset form visual feedback after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', item: '', category: 'main' });
        setActiveTab('list'); // Switch to list view to show their entry
      }, 1500);
    }
  };

  // Handle delete participant with password
  const handleDelete = (id) => {
    const password = prompt('Masukkan password untuk menghapus:');
    if (password === 'Frenaldi#234') {
      setParticipants(participants.filter(p => p.id !== id));
    } else if (password !== null) {
      alert('Password salah!');
    }
  };

  // Helper untuk ikon kategori
  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'main': return <Pizza size={16} className="text-orange-500" />;
      case 'drink': return <Coffee size={16} className="text-blue-500" />;
      case 'dessert': return <Cake size={16} className="text-pink-500" />;
      default: return <Utensils size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-gray-800 pb-12">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-orange-400 to-amber-300 text-white pt-12 pb-24 px-6 rounded-b-[3rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {/* Decorative Background Pattern */}
          <div className="absolute top-10 left-10 transform rotate-12"><Pizza size={64} /></div>
          <div className="absolute bottom-20 right-10 transform -rotate-12"><Cake size={64} /></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Utensils size={120} /></div>
        </div>

        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="inline-block bg-white text-orange-500 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm animate-bounce">
            🍽️ Christmas Potluck!
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-sm">
            Potluck Time
          </h1>
          <p className="text-lg text-orange-50 font-medium mb-6">
            Last Year L305
          </p>
          
          {/* Event Details Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 flex justify-between items-center text-sm md:text-base">
            <div className="flex flex-col items-center">
              <Calendar className="mb-1" size={20} />
              <span className="font-bold">Jumat, 5 Des</span>
            </div>
            <div className="h-8 w-px bg-white/40"></div>
            <div className="flex flex-col items-center">
              <Clock className="mb-1" size={20} />
              <span className="font-bold">12:00 WIB</span>
            </div>
            <div className="h-8 w-px bg-white/40"></div>
            <div className="flex flex-col items-center">
              <MapPin className="mb-1" size={20} />
              <span className="font-bold">Ruangan F208</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-md mx-auto px-4 -mt-16 relative z-20">
        
        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-full p-1 shadow-md mb-6">
          <button 
            onClick={() => setActiveTab('invite')}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'invite' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            RSVP & Menu
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'list' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Daftar Makanan ({participants.length})
          </button>
        </div>

        {/* TAB 1: RSVP FORM */}
        {activeTab === 'invite' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <Heart className="text-red-500 mr-2 fill-current" /> 
              Mau bawa apa nih?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Isi data di bawah ini biar menu kita bervariasi dan makin seru!
            </p>

            {isSubmitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4 flex items-center justify-center flex-col py-8">
                <CheckCircle size={48} className="mb-2" />
                <p className="font-bold">Asik! Terima kasih.</p>
                <p className="text-sm">Ditunggu kedatangannya ya!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" 
                      placeholder="Cth: Frenaldi"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Makanan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['main', 'drink', 'dessert'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`py-2 px-1 rounded-lg text-sm border flex flex-col items-center gap-1 transition-all ${formData.category === cat ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {getCategoryIcon(cat)}
                        <span className="capitalize text-xs">
                          {cat === 'main' ? 'Makanan' : cat === 'drink' ? 'Minuman' : 'Snack'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                  <div className="relative">
                    <Utensils className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      name="item"
                      value={formData.item}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" 
                      placeholder="Cth: Donat Kentang, Pizza, Jus Jeruk"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Saya Ikut & Bawa Makanan!
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LIST MAKANAN */}
        {activeTab === 'list' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Daftar Menu Sementara</h2>
              <p className="text-xs text-gray-500">Ayo bawa menu yang belum ada!</p>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {participants.map((p) => (
                <div key={p.id} className="p-4 hover:bg-orange-50 transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(p.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{p.item}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <User size={10} /> {p.name}
                    </p>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500 capitalize">
                     {p.category === 'main' ? 'Makanan' : p.category === 'drink' ? 'Minuman' : 'Snack'}
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Stats Footer */}
            <div className="bg-gray-50 p-3 text-xs text-center text-gray-500 border-t border-gray-200">
              Total {participants.length} orang berpartisipasi
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-gray-400 text-xs">
          <p>Jangan lupa datang tepat waktu ya!</p>
          <p>© Pak Frenaldi Powered by Gemini & Claude</p>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}