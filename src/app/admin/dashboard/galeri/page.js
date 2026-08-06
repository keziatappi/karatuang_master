import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';

export default async function GaleriPage() {
  const supabase = await createClient();

  async function deleteGaleri(formData) {
    'use server';
    const id = formData.get('id');
    const supabaseClient = await createClient();
    await supabaseClient.from('galeri').delete().eq('id', id);
    revalidatePath('/admin/dashboard/galeri');
    revalidatePath('/');
  }

  const { data: galeri, error } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Manajemen Galeri Foto</h1>
        <Link 
          href="/admin/dashboard/galeri/create"
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          + Tambah Foto
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          Error memuat data galeri: {error.message}. Pastikan tabel 'galeri' (id, title, image_url, created_at) sudah dibuat di Supabase.
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', width: '120px' }}>Foto</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Judul / Keterangan</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', width: '150px' }}>Tanggal Ditambahkan</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!galeri || galeri.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  Belum ada foto di galeri.
                </td>
              </tr>
            ) : (
              galeri.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.title || 'Foto Galeri'} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>🖼️</div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{item.title || 'Tanpa Judul'}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <form action={deleteGaleri}>
                      <input type="hidden" name="id" value={item.id} />
                      <button 
                        type="submit"
                        style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }}
                      >
                        Hapus
                      </button>
                    </form>
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
