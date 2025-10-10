import React, { useState, useCallback } from "react";
//import { useDropzone } from "react-dropzone";
import { api } from "../services/api";
import axios from "axios";
import type { FormEvent } from "react";
import "../styles/PostForm.css";

interface PostFormProps {
  userId: number;
  onPostCreated?: () => void;
}

const allCategories: string[] = [
  "🦈 Vida Marina",
  "🌊 Ecosistemas Oceánicos",
  "🤿 Ciencia y Exploración",
  "⚠️ Problemas y Amenazas",
  "🌎 Regiones y Océanos del Mundo",
];

export default function PostForm({ userId, onPostCreated }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [credits, setCredits] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };
// --- Manejo de subida de imágenes ---
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uploadedUrls: string[] = [];

      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
            formData
          );
          uploadedUrls.push(res.data.secure_url);
        } catch (err) {
          console.error("Error subiendo imagen:", err);
          setError("Error al subir alguna imagen");
        }
      }

      setImages([...images, ...uploadedUrls]);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/posts", {
        title,
        content,
        credits,
        categories,
        images,
        userId,
      });
      console.log("Post creado:", res.data);

      setTitle("");
      setContent("");
      setCredits("");
      setCategories([]);
      setImages([]);

      if (onPostCreated) onPostCreated();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Error al crear post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <label className="form-label">Título</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />

      <label className="form-label">Contenido</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-input"
        required
      />

      <label className="form-label">Créditos</label>
      <input
        type="text"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        className="form-input"
      />

      <label className="form-label">Categorías</label>
      <div className="category-dropdown">
        <div
          className="dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {categories.length > 0
            ? categories.join(", ")
            : "Selecciona categorías"}
          <span className={`arrow ${dropdownOpen ? "open" : ""}`} />
        </div>
        {dropdownOpen && (
          <div className="dropdown-list">
            {allCategories.map((cat) => (
              <div
                key={cat}
                className={`dropdown-item ${
                  categories.includes(cat) ? "selected" : ""
                }`}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="form-label">Imágenes</label>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí ...</p>
        ) : (
          <p>Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
        )}
      </div>

      <div className="preview-images">
        {images.map((url, idx) => (
          <img key={idx} src={url} alt={`Imagen ${idx}`} />
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Creando..." : "Crear descubrimiento"}
      </button>
    </form>
  );
}
