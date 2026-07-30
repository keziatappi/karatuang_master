import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: 'Admin Dashboard - Karatuang',
};

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '250px', 
        backgroundColor: '#1f2937', 
        color: '#f3f4f6', 
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Admin Panel</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Desa Karatuang</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin/dashboard" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '0.75rem', borderRadius: '6px', display: 'block', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#374151' } }}>
            🏠 Dashboard
          </Link>
          <Link href="/admin/dashboard/berita" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '0.75rem', borderRadius: '6px', display: 'block', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#374151' } }}>
            📰 Berita & Kegiatan
          </Link>
          <Link href="/admin/dashboard/perangkat" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '0.75rem', borderRadius: '6px', display: 'block', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#374151' } }}>
            👥 Perangkat Kelurahan
          </Link>
          <Link href="/admin/dashboard/galeri" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '0.75rem', borderRadius: '6px', display: 'block', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#374151' } }}>
            🖼️ Galeri (Segera)
          </Link>
          
          <div style={{ marginTop: 'auto' }}>
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
