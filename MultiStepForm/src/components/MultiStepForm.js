import React, { useState } from "react";
import { Form, Button, ProgressBar, Container, Row, Col, Card } from "react-bootstrap";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Address: "",
    city: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    } else if (step === 2) {
      if (!formData.Address.trim()) newErrors.Address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.zip.trim() || !/^\d{6}$/.test(formData.zip)) {
        newErrors.zip = "Enter a valid 6-digit ZIP code";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
      setStep(1); 
      setFormData({ name: "", email: "", street: "", city: "", zip: "" });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-4">
            <h2 className="text-center">Multi-Step Form</h2>
            <ProgressBar now={(step / 3) * 100} className="mb-3" />

            <Form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <h4>Step 1: Personal Info</h4>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Button onClick={handleNext}>Next</Button>
                </>
              )}

              {step === 2 && (
                <>
                  <h4>Step 2: Address</h4>
                  <Form.Group controlId="formAddress" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      placeholder="Enter Address"
                      value={formData.street}
                      onChange={handleChange}
                      isInvalid={!!errors.street}
                    />
                    <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formCity" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formZip" className="mb-3">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      placeholder="Enter ZIP code"
                      value={formData.zip}
                      onChange={handleChange}
                      isInvalid={!!errors.zip}
                    />
                    <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="secondary" onClick={handlePrev} className="me-2">
                    Back
                  </Button>
                  <Button onClick={handleNext}>Next</Button>
                </>
              )}

              {step === 3 && (
                <>
                  <h4>Step 3: Review & Submit</h4>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Street:</strong> {formData.street}</p>
                  <p><strong>City:</strong> {formData.city}</p>
                  <p><strong>ZIP:</strong> {formData.zip}</p>

                  <Button variant="secondary" onClick={handlePrev} className="me-2">
                    Back
                  </Button>
                  <Button type="submit">Submit</Button>
                </>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MultiStepForm;
