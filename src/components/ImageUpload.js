'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function ImageUpload({ onUploadComplete, initialImageUrl = '' }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
  const supabase = createClient();

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Gambar
      </label>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {previewUrl ? (
          <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '1rem' }}>
            <Image 
              src={previewUrl} 
              alt="Preview" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
        ) : (
          <div style={{ color: '#6b7280', marginBottom: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📸</span>
            <p>Pilih gambar untuk diunggah</p>
          </div>
        )}

        <div>
          <label style={{
            backgroundColor: uploading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            display: 'inline-block',
            fontWeight: '500'
          }}>
            {uploading ? 'Mengunggah...' : 'Pilih File Gambar'}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
