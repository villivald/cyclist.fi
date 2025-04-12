"use client";

import { useState, useId } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const id = useId();

  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
  const submitButtonDisabled =
    !email || !name || !message || !email.match(emailPattern);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table({ email, name, message });

    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor={`email-${id}`}>Your email (required)</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          placeholder="mail@example.com"
          onChange={(e) => setEmail(e.target.value)}
          id={`email-${id}`}
          required
          pattern={emailPattern}
        />
      </div>
      <div>
        <label htmlFor={`name-${id}`}>Your name (required)</label>
        <input
          type="text"
          autoComplete="name"
          value={name}
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          id={`name-${id}`}
          required
        />
      </div>
      <div>
        <label htmlFor={`message-${id}`}>Your message (required)</label>
        <textarea
          value={message}
          placeholder="Hello, I would like to talk about..."
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          id={`message-${id}`}
          required
        ></textarea>
      </div>
      <button
        disabled={submitButtonDisabled}
        type="submit"
        className={styles.submitButton}
      >
        Send me a message
      </button>
    </form>
  );
}
