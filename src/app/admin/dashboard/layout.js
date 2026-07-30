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
          <Link href="/admin/dashboard" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>
            Dashboard
          </Link>
          <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>
            Berita
          </Link>
          <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>
            Galeri
          </Link>
          <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', display: 'block' }}>
            Data Penduduk
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
