"use client";

import { useState } from "react";

import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const submitButtonDisabled = !email || !name || !message;

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
        <label htmlFor="email">Your email (required)</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          placeholder="mail@example.com"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          required
        />
      </div>
      <div>
        <label htmlFor="name">Your name (required)</label>
        <input
          type="text"
          autoComplete="name"
          value={name}
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          id="name"
          required
        />
      </div>
      <div>
        <label htmlFor="message">Your message (required)</label>
        <textarea
          value={message}
          placeholder="Hello, I would like to talk about..."
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          rows={5}
          required
        ></textarea>
      </div>
      <button disabled={submitButtonDisabled}>Send me a message</button>
    </form>
  );
}
