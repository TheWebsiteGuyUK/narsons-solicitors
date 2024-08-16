import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string; // Add honeypot field to the form data
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  honeypot?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // Initialize honeypot
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: '', // Clear the error message for the current field
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check honeypot field; if it's filled, treat as spam
    if (formData.honeypot) {
      console.log('Spam detected');
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Stop submission if there are validation errors
    }

    setIsSubmitting(true);

    const PUBLIC_API = import.meta.env.PUBLIC_API; // Fetch from environment variables
    const PUBLIC_API_KEY = import.meta.env.PUBLIC_API_KEY; // Fetch the API key from environment variables

    try {
      const response = await fetch(`${PUBLIC_API}/items/enquiries`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PUBLIC_API_KEY}`, // Use the API key for authorization if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submission successful!');
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 bg-white">
      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-800">Thank you!</h2>
          <p className="mt-4 text-primary-600">Your message has been successfully sent. We will get back to you shortly.</p>
        </div>
      ) : (
        <>
          <h2 className="mb-8 text-xl font-semibold text-primary-800">Fill in the form</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-1">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none ${
                      formErrors.name ? 'border-red-500' : 'border-primary-200'
                    }`}
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className={`py-3 px-4 block w-full border rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none ${
                    formErrors.email ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className={`py-3 px-4 block w-full border rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none ${
                    formErrors.phone ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`py-3 px-4 block w-full border rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none ${
                    formErrors.message ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
              </div>

              {/* Honeypot Field (hidden) */}
              <div className="hidden">
                <input
                  type="text"
                  name="honeypot"
                  id="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  placeholder="Leave this field empty"
                />
              </div>
            </div>

            <div className="mt-4 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-primary-500">All fields required.</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;
