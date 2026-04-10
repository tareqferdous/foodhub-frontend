"use client";

import { contactService } from "@/service/contact.service";
import { Clock3, Headphones, Mail, MapPin, Phone } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactCards = [
  {
    title: "Customer Support",
    detail: "support@foodhub.com",
    helper: "We usually respond within 15-30 minutes.",
    icon: Mail,
  },
  {
    title: "Call Us",
    detail: "+880 1234-567890",
    helper: "Available every day, 9:00 AM - 10:00 PM",
    icon: Phone,
  },
  {
    title: "Office",
    detail: "123 Food Street, Dhaka 1212",
    helper: "Drop by for partnerships and business queries.",
    icon: MapPin,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    const emailValue = formData.email.trim();
    if (!emailValue) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = "Please add a subject.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleFieldChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setSubmitStatus(null);

      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await contactService.submitContactMessage(formData);

      if (error) {
        setSubmitStatus({
          type: "error",
          message: error.message,
        });
        return;
      }

      setFormData(initialFormData);
      setSubmitStatus({
        type: "success",
        message:
          "Message sent successfully. Our support team will contact you soon.",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-white via-amber-50/50 to-rose-50/70'>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='max-w-3xl'>
          <p className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 shadow-sm'>
            <Headphones className='h-4 w-4' />
            Help and Support
          </p>
          <h1 className='mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>
            Need help with an order? We are here for you.
          </h1>
          <p className='mt-5 text-lg text-gray-600 leading-relaxed'>
            Reach out for order issues, payment questions, provider onboarding,
            or general platform support. Our team is ready to assist quickly.
          </p>
        </div>

        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-5'>
          {contactCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className='rounded-2xl bg-white border border-gray-100 shadow-sm p-6'>
                <div className='h-11 w-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='mt-4 text-lg font-semibold text-gray-900'>
                  {item.title}
                </h3>
                <p className='mt-1 text-base font-medium text-gray-800'>
                  {item.detail}
                </p>
                <p className='mt-2 text-sm text-gray-600'>{item.helper}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
          <div className='lg:col-span-3 rounded-3xl bg-white border border-gray-100 shadow-sm p-7 md:p-10'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Send us a message
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Fill up the form and our support team will contact you soon.
            </p>

            <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'>
                    Full Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    value={formData.name}
                    onChange={handleFieldChange("name")}
                    placeholder='Your full name'
                    className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100'
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <p className='mt-2 text-xs text-red-600'>{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'>
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={handleFieldChange("email")}
                    placeholder='you@example.com'
                    className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100'
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className='mt-2 text-xs text-red-600'>{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700'>
                  Subject
                </label>
                <input
                  id='subject'
                  type='text'
                  value={formData.subject}
                  onChange={handleFieldChange("subject")}
                  placeholder='How can we help?'
                  className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject && (
                  <p className='mt-2 text-xs text-red-600'>{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'>
                  Message
                </label>
                <textarea
                  id='message'
                  rows={6}
                  value={formData.message}
                  onChange={handleFieldChange("message")}
                  placeholder='Write your message here...'
                  className='mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p className='mt-2 text-xs text-red-600'>{errors.message}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='btn-primary disabled:cursor-not-allowed disabled:opacity-70'>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus && (
                <p
                  className={`text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>

          <aside className='lg:col-span-2 rounded-3xl border border-amber-100 bg-gradient-to-b from-amber-50 to-rose-50 p-7 md:p-8'>
            <h3 className='text-xl font-bold text-gray-900'>Support Hours</h3>
            <div className='mt-4 space-y-4 text-sm text-gray-700'>
              <div className='flex items-center gap-3'>
                <Clock3 className='h-5 w-5 text-amber-700' />
                <span>Every day: 9:00 AM - 10:00 PM</span>
              </div>
              <p>
                For urgent delivery issues, include your order ID in the message
                for faster resolution.
              </p>
            </div>

            <div className='mt-8 rounded-2xl bg-white/80 border border-white p-5'>
              <h4 className='font-semibold text-gray-900'>
                Provider Partnership
              </h4>
              <p className='mt-2 text-sm text-gray-700 leading-relaxed'>
                Want to grow your restaurant with FoodHub? Contact our
                partnership team at partners@foodhub.com.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
