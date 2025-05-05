import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<typeof formState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    
    // Clear error when field is edited
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<typeof formState> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions, feedback, or partnership inquiries.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Contact information */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 lg:p-12 text-white lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-indigo-100 mb-8">
                  Have questions about our AI fashion technology or interested in partnering with us? Our team is here to help.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 text-indigo-200" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-indigo-100">hello@styleai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 text-indigo-200" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-indigo-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 text-indigo-200" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-indigo-100">
                        123 Fashion Avenue<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-4 text-indigo-200" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-indigo-100">
                        Monday - Friday: 9am - 5pm<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-medium mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h21.352c.731 0 1.324-.592 1.324-1.324V1.324C24 .593 23.408 0 22.676 0zm-5.768 9.3c.006.117.006.232.006.348 0 3.56-2.708 7.664-7.664 7.664-1.53 0-2.95-.445-4.142-1.213.217.025.428.025.651.025 1.268 0 2.44-.432 3.37-1.165-1.19-.025-2.191-.802-2.533-1.87.168.025.335.05.508.05.242 0 .485-.031.713-.093-1.241-.25-2.17-1.344-2.17-2.656v-.032c.359.198.777.32 1.218.334-.726-.485-1.202-1.31-1.202-2.245 0-.497.133-.958.366-1.355 1.328 1.635 3.334 2.708 5.579 2.822-.044-.198-.069-.402-.069-.607 0-1.462 1.184-2.652 2.652-2.652.76 0 1.448.32 1.93.84.587-.112 1.155-.32 1.656-.607-.195.608-.608 1.116-1.142 1.442.52-.057 1.03-.2 1.495-.395-.347.516-.788.97-1.292 1.336z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact form */}
              <div className="p-8 lg:p-12 lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-800">
                          Your message has been sent successfully! We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.44927560394!2d-122.46873219379976!3d37.77737514383976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1651274732143!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;