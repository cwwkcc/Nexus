'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../atoms/Button';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Subject"
          {...register('subject')}
          error={errors.subject?.message}
        />
        <Textarea
          label="Message"
          rows={5}
          {...register('message')}
          error={errors.message?.message}
        />
      </div>

      <Button type="submit" loading={isSubmitting} fullWidth>
        Send Message
      </Button>

      {submitStatus === 'success' && (
        <p className="text-center text-semantic-success-base font-body text-sm">
          Message sent successfully. We'll get back to you soon.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-center text-semantic-error-base font-body text-sm">
          Failed to send. Please try again later.
        </p>
      )}
    </form>
  );
}
