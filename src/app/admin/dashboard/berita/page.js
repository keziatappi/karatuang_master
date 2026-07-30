import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function BeritaPage() {
  const supabase = await createClient();

  const { data: berita, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Manajemen Berita & Kegiatan</h1>
        <Link 
          href="/admin/dashboard/berita/create"
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          + Tambah Baru
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          Error: {error.message}
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Judul</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Tipe</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Tanggal</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!berita || berita.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  Belum ada berita atau kegiatan.
                </td>
              </tr>
            ) : (
              berita.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{item.title}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      backgroundColor: item.type === 'kegiatan' ? '#dbeafe' : '#fef3c7',
                      color: item.type === 'kegiatan' ? '#1e40af' : '#92400e',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Link 
                      href={`/admin/dashboard/berita/edit/${item.id}`}
                      style={{ color: '#3b82f6', marginRight: '1rem', textDecoration: 'none' }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
