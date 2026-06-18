"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

const SUBJECTS = [
  "General Inquiry",
  "Donations",
  "Volunteering",
  "Zakat & Fitrana",
  "Partnership",
  "Other",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.submitContact(formData);
      if (res.message) {
        toast.success(res.message);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dark:bg-dark pb-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
          <div className="lg:col-span-6 lg:order-1 order-2">
            <h2 className="max-w-72 text-[40px] leading-tight font-bold mb-9 text-midnight_text dark:text-white">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
              <div className="mx-0 my-2.5 w-full">
                <label htmlFor="name" className="pb-3 inline-block text-base">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                />
              </div>

              <div className="sm:flex gap-3 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="email" className="pb-3 inline-block text-base">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="phone" className="pb-3 inline-block text-base">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                  />
                </div>
              </div>

              <div className="mx-0 my-2.5 w-full">
                <label htmlFor="subject" className="pb-3 inline-block text-base">
                  Subject
                </label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                >
                  <option value="">Select a topic</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mx-0 my-2.5 w-full">
                <label htmlFor="message" className="pb-3 inline-block text-base">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white dark:bg-dark border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0 resize-y min-h-[120px]"
                />
              </div>

              <div className="mx-0 my-2.5 w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            {submitted && (
              <div className="flex gap-1.5 mt-3.5">
                <Image src="/images/icons/icon-right.svg" alt="" width={20} height={20} />
                <p className="text-secondary">
                  Thank you! Your message has been sent. We will get back to you soon.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 lg:order-2 order-1 h-[600px]">
            <Image
              src="/images/contact-page/contact.jpg"
              alt="Contact"
              width={1300}
              height={0}
              quality={100}
              className="w-full h-full object-cover bg-no-repeat rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
