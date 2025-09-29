"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const t = useTranslations("ContactForm");

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const id = useId();
  const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
  const emailRegex = new RegExp(`^${emailPattern}$`);

  const submitButtonDisabled = !emailRegex.test(email) || !name || !message;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table({ email, name, message });

    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <main>
      <h1>{t("title")}</h1>
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
            pattern={emailPattern}
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
        <button
          disabled={submitButtonDisabled}
          type="submit"
          className={styles.submitButton}
        >
          {t("submit_button")}
        </button>
      </form>
    </main>
  );
}
