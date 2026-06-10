'use client';

import { useState } from 'react';
import {
  Checkbox,
  ContactForm,
  FeedbackForm,
  FileUploadZone,
  FormErrorMessage,
  FormFieldGroup,
  FormSectionWrapper,
  FormValidationSummary,
  Input,
  ProgressIndicator,
  Radio,
  RequirementsChecklist,
  Select,
  Slider,
  Textarea,
  Toggle,
} from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-space-16">
      <h2 className="font-display text-h2 mb-space-6 pb-space-2 border-b border-border-light">
        {title}
      </h2>
      <div className="flex flex-wrap gap-space-8 items-start">{children}</div>
    </div>
  );
}

export default function FormsPage() {
  const [sliderValue, setSliderValue] = useState(50);
  const [progressValue, setProgressValue] = useState(30);

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Form Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          All form inputs, validation helpers, checklists, and full
          contact/feedback forms.
        </p>

        {/* Input */}
        <DemoSection title="Input">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" error="Invalid email address" />
          <Input label="Disabled" disabled />
          <Input
            label="Required"
            required
            helperText="This field is mandatory"
          />
        </DemoSection>

        {/* Textarea */}
        <DemoSection title="Textarea">
          <Textarea label="Message" rows={3} placeholder="Your message..." />
          <Textarea label="With Error" error="Message is required" />
        </DemoSection>

        {/* Select */}
        <DemoSection title="Select">
          <Select
            label="Country"
            options={[
              { value: 'lk', label: 'Sri Lanka' },
              { value: 'us', label: 'United States' },
            ]}
            placeholder="Select country"
          />
          <Select
            label="With Error"
            options={[{ value: 'a', label: 'Option A' }]}
            error="Please select an option"
          />
        </DemoSection>

        {/* Checkbox */}
        <DemoSection title="Checkbox">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox
            label="Subscribe to newsletter"
            description="Weekly updates about school events"
          />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Checked by default" defaultChecked />
        </DemoSection>

        {/* Radio */}
        <DemoSection title="Radio">
          <Radio name="gender" value="male" label="Male" />
          <Radio name="gender" value="female" label="Female" />
          <Radio name="gender" value="other" label="Other" disabled />
        </DemoSection>

        {/* Toggle */}
        <DemoSection title="Toggle">
          <Toggle label="Enable notifications" />
          <Toggle label="Dark mode" defaultChecked />
          <Toggle label="Disabled" disabled />
        </DemoSection>

        {/* FormErrorMessage */}
        <DemoSection title="FormErrorMessage">
          <FormErrorMessage variant="error">
            This field is required.
          </FormErrorMessage>
          <FormErrorMessage variant="warning">
            Please review your input.
          </FormErrorMessage>
          <FormErrorMessage variant="success">All good!</FormErrorMessage>
        </DemoSection>

        {/* FormFieldGroup */}
        <DemoSection title="FormFieldGroup">
          <FormFieldGroup as="fieldset" legend="Contact Information">
            <Input label="Name" />
            <Input label="Email" type="email" />
          </FormFieldGroup>
        </DemoSection>

        {/* FormSectionWrapper */}
        <DemoSection title="FormSectionWrapper">
          <FormSectionWrapper
            title="Personal Details"
            description="Your basic information"
          >
            <Input label="Full Name" />
            <Input label="Date of Birth" type="date" />
          </FormSectionWrapper>
        </DemoSection>

        {/* FormValidationSummary */}
        <DemoSection title="FormValidationSummary">
          <FormValidationSummary
            errors={['Name is required', 'Email is invalid']}
          />
          <FormValidationSummary successMessage="Form submitted successfully!" />
        </DemoSection>

        {/* ProgressIndicator */}
        <DemoSection title="ProgressIndicator – Bar">
          <div className="w-80">
            <ProgressIndicator
              variant="bar"
              value={progressValue}
              label="Upload progress"
              showPercentage
            />
            <button
              onClick={() => setProgressValue((v) => Math.min(100, v + 10))}
              className="mt-space-4 px-space-4 py-space-2 bg-green-base text-text-inverse rounded-sm"
            >
              Increase
            </button>
          </div>
        </DemoSection>

        <DemoSection title="ProgressIndicator – Steps">
          <ProgressIndicator
            variant="steps"
            steps={[
              { id: '1', label: 'Personal' },
              { id: '2', label: 'Academic' },
              { id: '3', label: 'Review' },
            ]}
            activeStep={1}
          />
        </DemoSection>

        {/* FileUploadZone */}
        <DemoSection title="FileUploadZone">
          <FileUploadZone
            label="Upload documents"
            accept=".pdf,.doc"
            maxSizeMb={5}
          />
        </DemoSection>

        {/* RequirementsChecklist */}
        <DemoSection title="RequirementsChecklist">
          <RequirementsChecklist
            title="Admission Requirements"
            items={[
              { id: 'birth', label: 'Birth certificate copy', required: true },
              {
                id: 'photo',
                label: 'Passport photo (2 copies)',
                required: true,
              },
              { id: 'previous', label: 'Previous school records' },
            ]}
          />
        </DemoSection>

        {/* Slider */}
        <DemoSection title="Slider">
          <Slider
            value={sliderValue}
            onChange={setSliderValue}
            label="Volume"
            showValue
          />
          <Slider defaultValue={75} showMarks label="Brightness" />
        </DemoSection>

        {/* ContactForm (full) */}
        <DemoSection title="ContactForm (Full)">
          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </DemoSection>

        {/* FeedbackForm (full) */}
        <DemoSection title="FeedbackForm (Full)">
          <div className="w-full max-w-md">
            <FeedbackForm />
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
