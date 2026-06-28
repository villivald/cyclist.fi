"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function NewsletterForm() {
  const t = useTranslations("NewsletterForm");
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const id = useId();
  const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
  const emailRegex = new RegExp(`^${emailPattern}$`);

  const validateEmail = (value: string) => {
    const normalizedValue = value.trim();
    if (!normalizedValue) return t("email_error_required");
    if (!emailRegex.test(normalizedValue)) return t("email_error_invalid");
    return null;
  };

  const emailErrorId = `email-error-${id}`;
  const submitButtonDisabled = !emailRegex.test(email.trim());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitButtonDisabled || isSubmitting) return;

    const nextEmailError = validateEmail(email);
    setEmailError(nextEmailError);
    if (nextEmailError) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const normalizedEmail = email.trim();
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Request failed");
      }

      const data = await res.json();
      setStatus({
        type: "success",
        message: data.alreadySubscribed
          ? t("submit_already_subscribed")
          : t("submit_success"),
      });
      setCountdownSeconds(5);

      setEmail("");
      setEmailError(null);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t("submit_error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
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
    <div className={styles.formContent}>
      <h1 data-testid="route-title">{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor={`email-${id}`}>{t("email_field_label")}</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            placeholder={t("email_field_placeholder")}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            id={`email-${id}`}
            required
            aria-invalid={emailError != null}
            aria-describedby={emailError ? emailErrorId : undefined}
          />
          {emailError ? (
            <p id={emailErrorId} className={styles.errorMessage} role="alert">
              <Image src={"/icons/warning.svg"} alt="" width={24} height={24} />
              {emailError}
            </p>
          ) : null}
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
                {` (${countdownSeconds}s)`}
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
    </div>
  );
}
