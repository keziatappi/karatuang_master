'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import Link from 'next/link';
import { use } from 'react';

export default function EditBerita({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: 'berita',
    excerpt: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('id', id)
        .single();
        
      if (data) {
        setFormData({
          title: data.title || '',
          type: data.type || 'berita',
          excerpt: data.excerpt || '',
          content: data.content || '',
          image_url: data.image_url || ''
        });
      }
      if (error) {
        alert('Gagal memuat data: ' + error.message);
      }
      setInitialLoading(false);
    };
    
    fetchBerita();
  }, [id, supabase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('berita')
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      
      router.push('/admin/dashboard/berita');
      router.refresh();
    } catch (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    
    try {
      const { error } = await supabase
        .from('berita')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      router.push('/admin/dashboard/berita');
      router.refresh();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (initialLoading) {
    return <div style={{ padding: '2rem' }}>Memuat data...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard/berita" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '1.5rem' }}>
            ←
          </Link>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Edit Berita / Kegiatan</h1>
        </div>
        <button 
          onClick={handleDelete}
          style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Hapus Data
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Judul</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tipe</label>
          <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          >
            <option value="berita">Berita</option>
            <option value="kegiatan">Kegiatan</option>
          </select>
        </div>

        <ImageUpload onUploadComplete={handleImageUpload} initialImageUrl={formData.image_url} />

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ringkasan (Excerpt)</label>
          <textarea 
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Konten Lengkap</label>
          <textarea 
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            backgroundColor: loading ? '#9ca3af' : '#3b82f6', 
            color: 'white', 
            padding: '0.75rem 2rem', 
            borderRadius: '6px', 
            border: 'none', 
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>

      </form>
    </div>
  );
}
