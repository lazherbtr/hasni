"use client";

import { useLanguage } from "@/lib/i18n";
import { useUploadThing } from "@/lib/uploadthing";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  productName: "",
  quantity: "",
  specifications: "",
  description: "",
  notes: "",
};

type FormData = typeof initialForm;
type StoredFile = { name: string; url: string };

export default function RequestForm() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState<StoredFile[]>([]);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload: startImageUpload, isUploading: uploadingImages } =
    useUploadThing("imageUploader", {
      onClientUploadComplete: (uploaded) => {
        setImages((prev) => [
          ...prev,
          ...uploaded.map((file) => ({
            name: file.name,
            url: file.url,
          })),
        ]);
      },
      onUploadError: (err) => {
        setError(err.message || "Failed to upload images.");
      },
    });

  const { startUpload: startDocumentUpload, isUploading: uploadingFiles } =
    useUploadThing("documentUploader", {
      onClientUploadComplete: (uploaded) => {
        setFiles((prev) => [
          ...prev,
          ...uploaded.map((file) => ({
            name: file.name,
            url: file.url,
          })),
        ]);
      },
      onUploadError: (err) => {
        setError(err.message || "Failed to upload files.");
      },
    });

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;
    setError(null);
    await startImageUpload(selectedFiles);
    e.target.value = "";
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;
    setError(null);
    await startDocumentUpload(selectedFiles);
    e.target.value = "";
  };

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadingImages || uploadingFiles) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images,
          documents: files,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to submit request.");
      }

      setImages([]);
      setFiles([]);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setImages([]);
    setFiles([]);
    setSubmitted(false);
    setError(null);
  };

  const isBusy = submitting || uploadingImages || uploadingFiles;

  const inputClass =
    "w-full bg-brand-surface-solid/80 border border-brand-border rounded-xl px-4 py-3 text-brand-text text-sm placeholder:text-brand-subtle/70 focus:outline-none focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/10 transition-all duration-200";
  const labelClass =
    "block text-xs font-semibold text-brand-muted mb-2 tracking-wide";

  return (
    <section id="request" ref={ref} className="section-block">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <p className="section-label">{t.form.label}</p>
          <h2 className="section-title">{t.form.title}</h2>
          <p className="section-subtitle">{t.form.subtitle}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card text-center py-14 px-8"
            >
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-accent-light to-brand-accent-soft border border-brand-border">
                <CheckCircle2 className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-brand-text mb-4">
                {t.form.successTitle}
              </h3>
              <p className="text-base text-brand-muted mb-10 leading-relaxed max-w-md mx-auto">
                {t.form.successDesc}
              </p>
              <button
                onClick={resetForm}
                className="btn-ghost border border-brand-border"
              >
                {t.form.successBack}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="glass-card overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 p-8 sm:p-10 bg-gradient-to-br from-brand-accent-soft/80 to-brand-sage-light/40 border-b lg:border-b-0 lg:border-e border-brand-border-light">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-brand-text mb-4">
                      {t.form.sideTitle}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-brand-muted mb-6">
                      {t.form.sideDesc}
                    </p>
                    <p className="text-xs text-brand-subtle italic border-t border-brand-border-light pt-5">
                      {t.form.sideNote}
                    </p>
                  </div>

                  <div className="lg:col-span-3 p-8 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            {t.form.companyName}
                          </label>
                          <input
                            required
                            value={form.companyName}
                            onChange={(e) =>
                              handleChange("companyName", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            {t.form.contactPerson}
                          </label>
                          <input
                            required
                            value={form.contactPerson}
                            onChange={(e) =>
                              handleChange("contactPerson", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>{t.form.email}</label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>{t.form.phone}</label>
                          <input
                            value={form.phone}
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="h-px bg-brand-border-light" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            {t.form.productName}
                          </label>
                          <input
                            required
                            value={form.productName}
                            onChange={(e) =>
                              handleChange("productName", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            {t.form.quantity}
                          </label>
                          <input
                            value={form.quantity}
                            onChange={(e) =>
                              handleChange("quantity", e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.form.specifications}
                        </label>
                        <textarea
                          value={form.specifications}
                          onChange={(e) =>
                            handleChange("specifications", e.target.value)
                          }
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.form.description}
                        </label>
                        <textarea
                          value={form.description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                          rows={4}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            {t.form.imageUpload}
                          </label>
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            disabled={uploadingImages}
                            onClick={() => imageInputRef.current?.click()}
                            className="w-full border border-dashed border-brand-border rounded-2xl py-7 flex flex-col items-center gap-2 hover:border-brand-accent/40 hover:bg-brand-accent-soft/50 transition-all duration-300 group disabled:opacity-60"
                          >
                            {uploadingImages ? (
                              <Loader2 className="w-5 h-5 text-brand-subtle animate-spin" />
                            ) : (
                              <Upload className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs text-brand-subtle">
                              {uploadingImages
                                ? t.form.uploading
                                : t.form.dragDrop}
                            </span>
                          </button>
                          {images.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {images.map((img, i) => (
                                <div
                                  key={`${img.url}-${i}`}
                                  className="flex items-center justify-between text-xs text-brand-muted py-1"
                                >
                                  <span className="truncate flex-1 text-brand-sage">
                                    ✓ {img.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                  >
                                    <X className="w-3.5 h-3.5 hover:text-red-400 transition-colors" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>
                            {t.form.fileUpload}
                          </label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            disabled={uploadingFiles}
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border border-dashed border-brand-border rounded-2xl py-7 flex flex-col items-center gap-2 hover:border-brand-accent/40 hover:bg-brand-accent-soft/50 transition-all duration-300 group disabled:opacity-60"
                          >
                            {uploadingFiles ? (
                              <Loader2 className="w-5 h-5 text-brand-subtle animate-spin" />
                            ) : (
                              <FileText className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs text-brand-subtle">
                              {uploadingFiles
                                ? t.form.uploading
                                : t.form.dragDrop}
                            </span>
                          </button>
                          {files.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {files.map((file, i) => (
                                <div
                                  key={`${file.url}-${i}`}
                                  className="flex items-center justify-between text-xs text-brand-muted py-1"
                                >
                                  <span className="truncate flex-1 text-brand-sage">
                                    ✓ {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(i)}
                                  >
                                    <X className="w-3.5 h-3.5 hover:text-red-400 transition-colors" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>{t.form.notes}</label>
                        <textarea
                          value={form.notes}
                          onChange={(e) =>
                            handleChange("notes", e.target.value)
                          }
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      {error && (
                        <p className="text-xs text-red-600 leading-relaxed bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                          {error}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isBusy}
                        whileHover={{ scale: isBusy ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary !py-3.5 disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                      >
                        {isBusy && (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {submitting
                          ? t.form.submitting
                          : uploadingImages || uploadingFiles
                            ? t.form.uploading
                            : t.form.submit}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
