"use client";

import { useState } from "react";
import { contactService } from "@/services/contact.service";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await contactService.create(form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-white text-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Get In <span className="text-red-500">Touch</span>
          </h2>

          <p className="text-gray-600 max-w-md">
            Feel free to contact me for collaborations or projects. I usually
            respond within 24 hours.
          </p>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-black/10 rounded-2xl p-6 bg-white/70 backdrop-blur-xl shadow-lg"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <Input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          {/* textarea (custom) */}
          <textarea
            name="message"
            placeholder="Message..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-black resize-none"
          />

          <Button type="submit" loading={loading} variant="primary">
            Send Message
          </Button>

          {success && (
            <p className="text-green-500 text-sm text-center">
              Message sent successfully ✅
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
