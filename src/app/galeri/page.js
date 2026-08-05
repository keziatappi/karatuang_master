import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Galeri Karatuang',
  description: 'Kumpulan foto dan potret dokumentasi Kelurahan Karatuang',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GaleriFullPage() {
  const supabase = await createClient();
  
  const { data: galeriList, error } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0', sticky: 'top', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/#galeri" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', textDecoration: 'none', fontWeight: '500' }}>
            <ArrowLeft size={20} /> Kembali
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/images/bantaeng-logo.png" alt="Logo Bantaeng" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Galeri Karatuang</h1>
          </div>
          <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Seluruh Potret</h2>
          <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Semua dokumentasi foto kegiatan, alam, dan masyarakat Kelurahan Karatuang yang telah dipublikasikan.
          </p>
        </div>

        {error && (
          <div style={{ textAlign: 'center', color: '#dc2626', padding: '2rem' }}>
            Gagal memuat galeri: {error.message}
          </div>
        )}

        {!error && (!galeriList || galeriList.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            Belum ada foto di galeri.
          </div>
        ) : (
          <div className="gallery-masonry">
            {galeriList?.map((item, index) => (
              <div key={item.id} className="gallery-item" style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${(index % 10) * 0.1}s`, opacity: 0 }}>
                <img
                  src={item.image_url}
                  alt={item.title || `Galeri Karatuang ${index + 1}`}
                  className="gallery-image"
                  loading="lazy"
                  style={{ borderRadius: '12px' }}
                />
                {item.title && (
                  <div style={{ marginTop: '0.75rem', padding: '0 0.5rem', color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>
                    {item.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
