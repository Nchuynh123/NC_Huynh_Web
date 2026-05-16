import { useRef, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../api/client';

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Upload ảnh' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch {
      setError('Upload thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
      <Button
        variant="outlined"
        startIcon={loading ? <CircularProgress size={18} /> : <CloudUploadIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        {label}
      </Button>
      {error && (
        <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      {value && (
        <Box
          component="img"
          src={value}
          alt="Preview"
          sx={{ mt: 2, maxWidth: 200, maxHeight: 200, borderRadius: 1, display: 'block' }}
        />
      )}
    </Box>
  );
}
