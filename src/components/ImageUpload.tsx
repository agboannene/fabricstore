"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 8 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setError("");
    setUploading(true);

    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        if (images.length + newUrls.length >= maxImages) break;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (data.success) {
          newUrls.push(data.data.url);
        } else {
          setError(data.error || "Upload failed");
        }
      }
      if (newUrls.length) onChange([...images, ...newUrls]);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function handleReorder(from: number, to: number) {
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((url, i) => (
          <div key={i} className="relative group w-24 h-24 rounded-md overflow-hidden border border-neutral-200">
            <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => handleReorder(i, i - 1)}
                  className="w-6 h-6 rounded bg-white/80 text-xs flex items-center justify-center hover:bg-white"
                >
                  &#8592;
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="w-6 h-6 rounded bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
              >
                &#10005;
              </button>
              {i < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleReorder(i, i + 1)}
                  className="w-6 h-6 rounded bg-white/80 text-xs flex items-center justify-center hover:bg-white"
                >
                  &#8594;
                </button>
              )}
            </div>
            {i === 0 && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                Main
              </span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded-md border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-400 hover:border-primary-400 hover:text-primary-500 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <span className="text-xs">Uploading...</span>
            ) : (
              <>
                <span className="text-2xl leading-none">+</span>
                <span className="text-[10px] mt-1">Add Image</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-neutral-400 mt-1">
        {images.length}/{maxImages} images. First image is the main one.
      </p>
    </div>
  );
}
