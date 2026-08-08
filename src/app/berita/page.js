import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Building2, Palette } from 'lucide-react';

export const metadata = {
  title: 'Semua Berita Karatuang | Kelurahan Karatuang',
  description: 'Kumpulan berita, kegiatan, dan informasi terbaru dari Kelurahan Karatuang.',
  openGraph: {
    title: 'Semua Berita Karatuang | Kelurahan Karatuang',
    description: 'Kumpulan berita, kegiatan, dan informasi terbaru dari Kelurahan Karatuang.',
    type: 'website',
  }
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BeritaFullPage() {
  const supabase = await createClient();
  
  const { data: newsList, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/#berita" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', textDecoration: 'none', fontWeight: '500' }}>
            <ArrowLeft size={20} /> Kembali
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/images/bantaeng-logo.png" alt="Logo Bantaeng" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Berita Karatuang</h1>
          </div>
          <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Semua Berita & Kegiatan</h2>
          <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Informasi terbaru seputar kegiatan, pembangunan, dan kabar penting lainnya dari Kelurahan Karatuang.
          </p>
        </div>

        {error && (
          <div style={{ textAlign: 'center', color: '#dc2626', padding: '2rem' }}>
            Gagal memuat berita: {error.message}
          </div>
        )}

        {!error && (!newsList || newsList.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            Belum ada berita atau kegiatan yang dipublikasikan.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {newsList?.map((item, index) => (
              <div key={item.id} className="news-card" style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${(index % 10) * 0.1}s`, opacity: 0 }}>
                <div className="news-card-image-wrapper">
                  <Image
                    src={item.image_url || "/images/agriculture.png"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="news-card-image"
                  />
                  <div className="news-card-date-badge">
                    <span className="day">{new Date(item.created_at).getDate()}</span>
                    <span className="month">{new Date(item.created_at).toLocaleDateString('id-ID', {month: 'short'})}</span>
                  </div>
                </div>
                <div className="news-card-body">
                  <span className={`news-category ${item.type === 'kegiatan' ? 'culture' : ''}`}>
                    {item.type === 'kegiatan' ? <Palette size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} /> : <Building2 size={16} style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}} />}
                    <span style={{textTransform: 'capitalize'}}>{item.type}</span>
                  </span>
                  <h4 className="news-card-title">
                    {item.title}
                  </h4>
                  <p className="news-card-excerpt">
                    {item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : '')}
                  </p>
                  <Link href={`/berita/${item.id}`} className="news-read-more" style={{textDecoration: 'none'}}>
                    Baca Selengkapnya
                    <ArrowRight size={16} />
                  </Link>
                </div>
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
