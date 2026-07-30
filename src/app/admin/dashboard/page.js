import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/admin');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Selamat Datang di Dashboard Admin</h1>
      <p>Anda login sebagai: <strong>{user.email}</strong></p>
      
      <div style={{ marginTop: '2rem' }}>
        <p>Silakan pilih menu di samping untuk mengelola konten website.</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          {/* Placeholder for dashboard widgets */}
          <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3>Berita</h3>
            <p>Kelola berita dan pengumuman desa.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3>Galeri</h3>
            <p>Kelola foto dan dokumentasi kegiatan.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3>Data Penduduk</h3>
            <p>Kelola statistik dan data kependudukan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
