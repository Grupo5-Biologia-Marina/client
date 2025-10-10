import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "../services/api";
import axios from "axios";
import type { FormEvent } from "react";
import "../styles/PostForm.css";

interface PostFormProps {
  userId?: number;
  onPostCreated?: () => void;
}

export default function PostForm({ userId, onPostCreated }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [credits, setCredits] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allCategories: string[] = [
    "🦈 Vida Marina",
    "🌊 Ecosistemas Oceánicos",
    "🤿 Ciencia y Exploración",
    "⚠️ Problemas y Amenazas",
    "🌎 Regiones y Océanos del Mundo",
  ];

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  // Dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImages((prev) => [...prev, ...acceptedFiles]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Eliminar imagen antes de subir
  const removeImage = (file: File) => {
    setImages((prev) => prev.filter((img) => img !== file));
  };

  // Subir todas las imágenes al enviar el formulario
  const uploadAllImages = async () => {
    const uploadedUrls: string[] = [];
    for (const file of images) {
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
    return uploadedUrls;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const userIdStored = userId || Number(localStorage.getItem("userId"));

      if (!token || !userIdStored) {
        setError("Debes iniciar sesión.");
        setLoading(false);
        return;
      }

      const imageUrls = await uploadAllImages();

      const res = await api.post(
        "/api/posts",
        {
          title,
          content,
          credits,
          categories,
          images: imageUrls,
          userId: userIdStored,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Post creado:", res.data);

      setTitle("");
      setContent("");
      setCredits("");
      setCategories([]);
      setImages([]);
      setUploadedImages([]);
      if (onPostCreated) onPostCreated();
    } catch (err: any) {
      console.error("Error creando post:", err);
      setError(err?.response?.data?.message || "Error al crear post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <label className="form-label">Título</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />

      <label className="form-label">Contenido</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-input" required />

      <label className="form-label">Créditos</label>
      <input type="text" value={credits} onChange={(e) => setCredits(e.target.value)} className="form-input" />

      <label className="form-label">Categorías</label>
      <div className="category-dropdown">
        <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {categories.length > 0 ? categories.join(", ") : "Selecciona categorías"}
          <span className={`arrow ${dropdownOpen ? "open" : ""}`} />
        </div>
        {dropdownOpen && (
          <div className="dropdown-list">
            {allCategories.map((cat) => (
              <div key={cat} className={`dropdown-item ${categories.includes(cat) ? "selected" : ""}`} onClick={() => toggleCategory(cat)}>
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="form-label">Imágenes</label>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {images.length === 0 && (
          <p>{isDragActive ? "Suelta las imágenes aquí..." : "Arrastra la imagen aquí o haz clic para seleccionar"}</p>
        )}

        <div className="preview-images-dropzone">
          {images.map((file, idx) => (
            <div key={idx} className="preview-image">
              <img src={URL.createObjectURL(file)} alt={`Imagen ${idx}`} />
              <button
                type="button"
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation(); // ❌ Evita que se abra el selector al eliminar
                  removeImage(file);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>


      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Creando..." : "Crear descubrimiento"}
      </button>
    </form>
  );
}

