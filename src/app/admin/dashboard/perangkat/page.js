import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function PerangkatPage() {
  const supabase = await createClient();

  const { data: perangkat, error } = await supabase
    .from('perangkat_kelurahan')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Manajemen Perangkat Kelurahan</h1>
        <Link 
          href="/admin/dashboard/perangkat/create"
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          + Tambah Perangkat
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
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', width: '80px' }}>Foto</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Nama Lengkap</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563' }}>Jabatan</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', width: '100px' }}>Urutan</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#4b5563', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!perangkat || perangkat.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  Belum ada data perangkat kelurahan.
                </td>
              </tr>
            ) : (
              perangkat.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>👤</div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{item.name}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#4b5563' }}>{item.position}</div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                      {item.order_index}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Link 
                      href={`/admin/dashboard/perangkat/edit/${item.id}`}
                      style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}
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
