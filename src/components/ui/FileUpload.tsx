import { useRef, useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // em bytes
  onFileSelect: (file: File) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  helperText?: string;
}

export function FileUpload({
  label,
  accept = '*/*',
  maxSize,
  onFileSelect,
  loading = false,
  error,
  success,
  helperText,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (file: File) => {
    if (maxSize && file.size > maxSize) {
      alert(`Arquivo muito grande. Máximo: ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    setSelectedFile(file);
    await onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">
        {label}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
          isDragging
            ? 'border-[#A1B5D8] bg-[#A1B5D8]/5'
            : error
              ? 'border-red-300 dark:border-red-700'
              : success
                ? 'border-green-300 dark:border-green-700'
                : 'border-[#92A3C0]/30 dark:border-[#324A5F]'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFileChange(e.target.files[0]);
            }
          }}
          disabled={loading}
          className="hidden"
        />

        <div className="p-6 text-center space-y-3">
          <div className="flex justify-center">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A1B5D8]" />
            ) : success ? (
              <Check className="h-8 w-8 text-green-500" />
            ) : error ? (
              <X className="h-8 w-8 text-red-500" />
            ) : (
              <Upload className="h-8 w-8 text-[#92A3C0] dark:text-[#A1B5D8]" />
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">
              {selectedFile ? selectedFile.name : 'Arraste o arquivo aqui ou clique para selecionar'}
            </p>
            {helperText && <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mt-1">{helperText}</p>}
            {maxSize && (
              <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8]">
                Máximo: {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {success && <p className="text-xs text-green-600 dark:text-green-400">Arquivo carregado com sucesso!</p>}
    </div>
  );
}
