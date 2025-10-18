'use client';

import Head from 'next/head';
import { useState } from 'react';
import { sendSupportEmail } from './actions';
import FormSubmitButton from '@/components/FormSubmitButton';
import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { DOMAIN } from '../../../constants';

export default function Support() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Update form data as user types
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setIsPending(true);

    const { email, name, message } = formData;

    if (!email || !name || !message) {
      alert('Please fill out all fields.');
      setIsPending(false);
      return;
    }

    try {
      await sendSupportEmail({ email, name, message });
      setSuccess(true);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send your message. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="space-y-6">
      <Head>
        <title>Support | Daoism - Laozi AI</title>
        <meta
          name="description"
          content="Get in touch with developer for inquiries or feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-3">
        <H1>Support</H1>
        <p>
          If you have any questions, feedback, or need assistance, please fill
          out the form below. We will get back to you as soon as possible.
        </p>
        <p>
          You can also reach us directly at{' '}
          <a
            href={`mailto:support@${DOMAIN}`}
            className="text-primary underline"
          >
            support@{DOMAIN}
          </a>
          .
        </p>
        <p className="text-sm text-gray-500">
          Your information will only be used to respond to your inquiry and will
          not be shared.
        </p>
      </div>

      <form
        id="support"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6"
      >
        <label className="block">
          <H2>Full Name</H2>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-3 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-950"
            placeholder="John Doe"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="email" className="block">
          <H2>Email Address</H2>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-3 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-950"
            placeholder="example@something.something"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="message" className="block">
          <H2>Message</H2>
          <textarea
            id="message"
            name="message"
            className="mt-3 w-full border border-gray-300 rounded-md p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-950 dark:bg-gray-800 dark:text-white"
            rows={3}
            placeholder="Your message"
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <div className="flex items-center gap-2">
          <FormSubmitButton
            disabled={isPending || success}
            form="support"
            className="btn-block"
          >
            {isPending ? 'Sending...' : 'Send'}
          </FormSubmitButton>
          {isPending && (
            <span
              className="inline-block w-4 h-4 border-2 border-t-transparent border-purple-950 rounded-full animate-spin"
              aria-label="Loading"
            />
          )}
          {!isPending && success && <span className="text-success">Sent.</span>}
        </div>
      </form>
    </section>
  );
}
