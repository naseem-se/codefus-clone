import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('https://formspree.io/f/xovgwbpk', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        })
      });

      if (response.ok) {
        setStatus('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id='contact' className="mb-10 h-px w-full max-w-[1320px] bg-[linear-gradient(90deg,rgba(233,233,233,0.00)_0%,rgba(255,255,255,0.60)_53%,rgba(233,233,233,0.00)_100%)] opacity-30"></div>

      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="mb-10 block">
            <h1 className="bg-gradient-to-b from-[#F4F4F6] to-[#B3B0BC] bg-clip-text text-3xl font-medium text-transparent md:text-5xl md:leading-normal md:tracking-[-2px]">
              Let's Work <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Together</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Have a question or ready to get started? We'd love to hear from you. Drop us a message and our team will respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" style={{ stroke: '#5D68A3' }} />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Email us at</p>
                  <p className="text-white font-semibold">hello@example.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" style={{ stroke: '#5D68A3' }} />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Call us</p>
                  <p className="text-white font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" style={{ stroke: '#5D68A3' }} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" style={{ stroke: '#5D68A3' }} />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Visit us</p>
                  <p className="text-white font-semibold">123 Business Street, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#000000] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                    }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#000000] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#000000] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                    }`}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 bg-[#000000] border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                    }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {status && (
                <div className={`p-3 rounded-lg text-sm ${status.includes('successfully')
                  ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                  : 'bg-red-500/20 text-red-300 border border-red-500/50'
                  }`}>
                  {status}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 group flex items-center justify-center gap-2 px-3.5 py-2 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 rounded-[500px] bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_0px_0px_rgba(93,104,163,0)] hover:shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}