'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../atoms/Button';
import { FormValidationSummary } from '../forms/FormValidationSummary';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';

const feedbackSchema = z.object({
  name: z.string().optional(),
  category: z.enum(['ACADEMIC', 'FACILITIES', 'ADMINISTRATION', 'GENERAL']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  anonymous: z.boolean().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const categoryOptions = [
  { value: 'ACADEMIC', label: 'Academics' },
  { value: 'FACILITIES', label: 'Facilities' },
  { value: 'ADMINISTRATION', label: 'Administration' },
  { value: 'GENERAL', label: 'General' },
];

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    // @ts-expect-error Zod resolver type mismatch with strict mode
    resolver: zodResolver(feedbackSchema),
    defaultValues: { anonymous: false, category: 'GENERAL' },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
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
      <FormValidationSummary
        errors={
          submitStatus === 'error'
            ? ['Submission failed. Please try again.']
            : null
        }
      />

      <div className="space-y-4">
        <Input
          label="Your Name (optional)"
          placeholder="You can remain anonymous"
          {...register('name')}
          error={errors.name?.message}
          helperText="If you choose to remain anonymous, we won't contact you directly."
        />

        <Select
          label="Category"
          options={categoryOptions}
          {...register('category')}
          error={errors.category?.message}
        />

        <Textarea
          label="Your Feedback"
          placeholder="Please share your thoughts, suggestions, or concerns..."
          rows={5}
          {...register('message')}
          error={errors.message?.message}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous"
            {...register('anonymous')}
            className="w-4 h-4 rounded border-border-default text-green-base focus:ring-gold-base"
          />
          <label
            htmlFor="anonymous"
            className="font-body text-body-sm text-text-primary"
          >
            Submit anonymously (do not store my name)
          </label>
        </div>
      </div>

      <Button type="submit" loading={isSubmitting} fullWidth>
        Submit Feedback
      </Button>

      {submitStatus === 'success' && (
        <p className="text-center text-semantic-success-base font-body text-sm">
          Thank you for your feedback!
        </p>
      )}
    </form>
  );
}
