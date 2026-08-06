import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: berita } = await supabase
    .from('berita')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan | Kelurahan Karatuang',
    };
  }

  const plainTextContent = berita.content 
    ? berita.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...' 
    : 'Berita dan informasi terbaru dari Kelurahan Karatuang.';

  return {
    title: `${berita.title} | Kelurahan Karatuang`,
    description: plainTextContent,
    openGraph: {
      title: `${berita.title} | Kelurahan Karatuang`,
      description: plainTextContent,
      images: berita.image_url ? [berita.image_url] : [],
      type: 'article',
    },
  };
}

export default async function BeritaDetail({ params }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: berita, error } = await supabase
    .from('berita')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !berita) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Berita tidak ditemukan</h2>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date(berita.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Simple Header */}
      <nav style={{ backgroundColor: 'white', padding: '1rem 2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>&larr;</span> Kembali
        </Link>
      </nav>

      <main style={{ maxWidth: '800px', margin: '2rem auto', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {berita.image_url ? (
          <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <Image 
              src={berita.image_url} 
              alt={berita.title} 
              fill 
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#9ca3af', fontSize: '1.25rem' }}>Tidak ada gambar</span>
          </div>
        )}
        
        <div style={{ padding: '3rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ 
              backgroundColor: berita.type === 'kegiatan' ? '#dbeafe' : '#fef3c7',
              color: berita.type === 'kegiatan' ? '#1e40af' : '#92400e',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'capitalize'
            }}>
              {berita.type}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {dateStr}
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            {berita.title}
          </h1>

          <div 
            style={{ 
              color: '#374151', 
              lineHeight: '1.8', 
              fontSize: '1.125rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {berita.content}
          </div>
        </div>
      </main>
    </div>
  );
}
