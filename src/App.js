import React, { useState } from "react";
import "./App.css"; // Optional for styling

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Form submitted successfully!");
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <div className="container">
      <h2>React Form</h2>
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
