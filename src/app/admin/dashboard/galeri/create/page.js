'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import Link from 'next/link';

export default function CreateGaleri() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_url) {
      alert('Silakan unggah foto terlebih dahulu.');
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase
        .from('galeri')
        .insert([{
          title: formData.title,
          image_url: formData.image_url
        }]);

      if (error) throw error;
      
      router.push('/admin/dashboard/galeri');
      router.refresh();
    } catch (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/admin/dashboard/galeri" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '1.5rem' }}>
          ←
        </Link>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Tambah Foto Galeri</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Judul / Keterangan</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Contoh: Kegiatan Gotong Royong warga..."
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Foto</label>
          <ImageUpload onUploadComplete={handleImageUpload} />
          {formData.image_url && (
            <div style={{ marginTop: '1rem', color: '#10b981', fontWeight: '500' }}>
              ✓ Foto berhasil diunggah
            </div>
          )}
        </div>

        <button 
          type="submit"
          disabled={loading || !formData.image_url}
          style={{ 
            backgroundColor: (loading || !formData.image_url) ? '#9ca3af' : '#3b82f6', 
            color: 'white', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '6px', 
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: (loading || !formData.image_url) ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? 'Menyimpan...' : 'Simpan Foto'}
        </button>
      </form>
    </div>
  );
}
