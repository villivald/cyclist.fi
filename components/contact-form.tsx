"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("general");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const id = useId();
  const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
  const emailRegex = new RegExp(`^${emailPattern}$`);

  const subjectOptions: {
    value: string;
    label: string;
  }[] = [
    { value: "general", label: t("subject_option_general") },
    { value: "bug", label: t("subject_option_bug") },
    {
      value: "content_suggestion",
      label: t("subject_option_content_suggestion"),
    },
    { value: "collaboration", label: t("subject_option_collaboration") },
  ];

  const allowedSubjects = [
    "general",
    "bug",
    "content_suggestion",
    "collaboration",
  ];

  useEffect(() => {
    const initialSubject = searchParams.get("subject");
    if (initialSubject && allowedSubjects.includes(initialSubject)) {
      setSubject(initialSubject);
    }
    // Only run on mount and when searchParams change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const validateEmail = (value: string) => {
    const normalizedValue = value.trim();
    if (!normalizedValue) return t("email_error_required");
    if (!emailRegex.test(normalizedValue)) return t("email_error_invalid");
    return null;
  };

  const validateMessage = (value: string) => {
    if (!value.trim()) return t("message_error_required");
    return null;
  };

  const emailErrorId = `email-error-${id}`;
  const messageErrorId = `message-error-${id}`;

  const trimmedMessage = message.trim();
  const submitButtonDisabled =
    !emailRegex.test(email.trim()) || trimmedMessage.length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitButtonDisabled || isSubmitting) return;

    const nextEmailError = validateEmail(email);
    const nextMessageError = validateMessage(message);

    setEmailError(nextEmailError);
    setMessageError(nextMessageError);

    if (nextEmailError || nextMessageError) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const normalizedEmail = email.trim();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          fromEmail: normalizedEmail,
          name,
          subject: t(`subject_option_${subject}`),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Request failed");
      }

      setStatus({ type: "success", message: t("submit_success") });
      setCountdownSeconds(5);

      setEmail("");
      setName("");
      setSubject("general");
      setMessage("");
      setEmailError(null);
      setMessageError(null);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t("submit_error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeValidatableField = (
    value: string,
    error: string | null,
    setValue: (value: string) => void,
    setError: (error: string | null) => void,
    validate: (value: string) => string | null,
  ) => {
    setValue(value);
    if (error) setError(validate(value));
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
            onChange={(e) =>
              handleChangeValidatableField(
                e.target.value,
                emailError,
                setEmail,
                setEmailError,
                validateEmail,
              )
            }
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
        <div>
          <label htmlFor={`subject-${id}`}>{t("subject_field_label")}</label>
          <select
            id={`subject-${id}`}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          />
        </div>
        <div>
          <label htmlFor={`message-${id}`}>{t("message_field_label")}</label>
          <textarea
            value={message}
            placeholder={t("message_field_placeholder")}
            onChange={(e) =>
              handleChangeValidatableField(
                e.target.value,
                messageError,
                setMessage,
                setMessageError,
                validateMessage,
              )
            }
            onBlur={(e) => setMessageError(validateMessage(e.target.value))}
            rows={5}
            id={`message-${id}`}
            required
            aria-invalid={messageError != null}
            aria-describedby={messageError ? messageErrorId : undefined}
          />
          {messageError ? (
            <p id={messageErrorId} className={styles.errorMessage} role="alert">
              <Image src={"/icons/warning.svg"} alt="" width={24} height={24} />
              {messageError}
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
    </main>
  );
}
