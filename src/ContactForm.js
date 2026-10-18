import React, { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState(""); // ⬅ New state

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmittedName(form.name); // ⬅ Save name before resetting
      setSubmitted(true);
      setErrors({});
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {submitted ? (
        <h2 style={{ textAlign: "center" }}>
          Thank you, {submittedName}!
        </h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
            {errors.name && (
              <p style={{ color: "red", margin: 0 }}>{errors.name}</p>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
            {errors.email && (
              <p style={{ color: "red", margin: 0 }}>{errors.email}</p>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
            {errors.message && (
              <p style={{ color: "red", margin: 0 }}>{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
