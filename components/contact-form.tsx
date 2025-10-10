"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  const id = useId();
  const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
  const emailRegex = new RegExp(`^${emailPattern}$`);

  const submitButtonDisabled = !emailRegex.test(email) || !name || !message;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitButtonDisabled || isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, fromEmail: email, name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Request failed");
      }

      setStatus({ type: "success", message: t("submit_success") });
      setCountdownSeconds(5);

      setEmail("");
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t("submit_error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status?.type !== "success" || countdownSeconds == null) return;

    if (countdownSeconds <= 0) {
      router.push("/");
      return;
    }

    const timerId = setTimeout(() => {
      setCountdownSeconds((prev) => (prev == null ? prev : prev - 1));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [status?.type, countdownSeconds, router]);

  return (
    <main>
      <h1 data-testid="route-title">{t("title")}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor={`email-${id}`}>{t("email_field_label")}</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            placeholder={t("email_field_placeholder")}
            onChange={(e) => setEmail(e.target.value)}
            id={`email-${id}`}
            required
            aria-invalid={email.length > 0 && !emailRegex.test(email)}
          />
        </div>
        <div>
          <label htmlFor={`name-${id}`}>{t("name_field_label")}</label>
          <input
            type="text"
            autoComplete="name"
            value={name}
            placeholder={t("name_field_placeholder")}
            onChange={(e) => setName(e.target.value)}
            id={`name-${id}`}
            required
          />
        </div>
        <div>
          <label htmlFor={`message-${id}`}>{t("message_field_label")}</label>
          <textarea
            value={message}
            placeholder={t("message_field_placeholder")}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            id={`message-${id}`}
            required
          />
        </div>
        {status?.message ? (
          <p role={status.type === "error" ? "alert" : undefined}>
            <span>
              <Image
                src={
                  status.type === "error"
                    ? "/icons/error.svg"
                    : "/icons/success.svg"
                }
                alt=""
                width={40}
                height={40}
              />

              {status.message}
            </span>
            {status.type === "success" && countdownSeconds != null ? (
              <span aria-live="polite">
                {t("redirecting_in")}
                {`(${countdownSeconds}s)`}
              </span>
            ) : null}
          </p>
        ) : null}
        <button
          disabled={submitButtonDisabled || isSubmitting}
          type="submit"
          className={styles.submitButton}
        >
          {isSubmitting ? t("submitting_button") : t("submit_button")}
        </button>
      </form>
    </main>
  );
}
