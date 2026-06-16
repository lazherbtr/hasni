"use client";

import { useLanguage } from "@/lib/i18n";
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
type UploadedFile = { name: string; url: string; file: File };

const CONTACT_EMAIL = "lazherbou3@gmail.com";

function addLocalFiles(selectedFiles: File[]): UploadedFile[] {
  return selectedFiles.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
    file,
  }));
}

function revokeUploadedFiles(uploads: UploadedFile[]) {
  uploads.forEach((upload) => URL.revokeObjectURL(upload.url));
}

export default function RequestForm() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;
    setUploadingImages(true);
    setError(null);
    try {
      const uploaded = addLocalFiles(selectedFiles);
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images.");
    } finally {
      setUploadingImages(false);
      e.target.value = "";
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;
    setUploadingFiles(true);
    setError(null);
    try {
      const uploaded = addLocalFiles(selectedFiles);
      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload files.");
    } finally {
      setUploadingFiles(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) =>
    setImages((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
  const removeFile = (index: number) =>
    setFiles((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("_subject", `Sourcing Request: ${form.productName} — ${form.companyName}`);
      body.append("_captcha", "false");
      body.append("_template", "table");
      body.append("Company Name", form.companyName);
      body.append("Contact Person", form.contactPerson);
      body.append("Email", form.email);
      body.append("Phone", form.phone);
      body.append("Product Name", form.productName);
      body.append("Quantity", form.quantity);
      body.append("Specifications", form.specifications);
      body.append("Description", form.description);
      body.append("Additional Notes", form.notes);
      images.forEach((img) => body.append("attachment", img.file));
      files.forEach((file) => body.append("attachment", file.file));

      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          body,
          headers: { Accept: "application/json" },
        },
      );

      const data = (await response.json()) as { success?: string; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Failed to submit request.");
      }

      revokeUploadedFiles(images);
      revokeUploadedFiles(files);
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
    revokeUploadedFiles(images);
    revokeUploadedFiles(files);
    setForm(initialForm);
    setImages([]);
    setFiles([]);
    setSubmitted(false);
    setError(null);
  };

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
                            onClick={() => imageInputRef.current?.click()}
                            className="w-full border border-dashed border-brand-border rounded-2xl py-7 flex flex-col items-center gap-2 hover:border-brand-accent/40 hover:bg-brand-accent-soft/50 transition-all duration-300 group"
                          >
                            {uploadingImages ? (
                              <Loader2 className="w-5 h-5 text-brand-subtle animate-spin" />
                            ) : (
                              <Upload className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs text-brand-subtle">
                              {t.form.dragDrop}
                            </span>
                          </button>
                          {images.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {images.map((img, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between text-xs text-brand-muted py-1"
                                >
                                  <span className="truncate flex-1">
                                    {img.name}
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
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border border-dashed border-brand-border rounded-2xl py-7 flex flex-col items-center gap-2 hover:border-brand-accent/40 hover:bg-brand-accent-soft/50 transition-all duration-300 group"
                          >
                            {uploadingFiles ? (
                              <Loader2 className="w-5 h-5 text-brand-subtle animate-spin" />
                            ) : (
                              <FileText className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs text-brand-subtle">
                              {t.form.dragDrop}
                            </span>
                          </button>
                          {files.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {files.map((file, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between text-xs text-brand-muted py-1"
                                >
                                  <span className="truncate flex-1">
                                    {file.name}
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
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary !py-3.5 disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                      >
                        {submitting && (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {submitting ? t.form.submitting : t.form.submit}
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
