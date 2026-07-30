'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import Link from 'next/link';

export default function CreatePerangkat() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    order_index: 0,
    image_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'order_index' ? parseInt(value) || 0 : value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('perangkat_kelurahan')
        .insert([formData]);

      if (error) throw error;
      
      router.push('/admin/dashboard/perangkat');
      router.refresh();
    } catch (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/admin/dashboard/perangkat" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '1.5rem' }}>
          ←
        </Link>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Tambah Perangkat Kelurahan</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nama Lengkap</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Jabatan</label>
          <input 
            type="text" 
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Contoh: Kepala Kelurahan, Sekretaris"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Urutan Tampil (Makin kecil makin awal)</label>
          <input 
            type="number" 
            name="order_index"
            value={formData.order_index}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
        </div>

        <ImageUpload onUploadComplete={handleImageUpload} />

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
            width: '100%',
            marginTop: '1rem'
          }}
        >
          {loading ? 'Menyimpan...' : 'Simpan Data'}
        </button>

      </form>
    </div>
  );
}
