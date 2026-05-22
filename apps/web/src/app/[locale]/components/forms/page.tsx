// apps/web/src/app/[locale]/components/forms/page.tsx
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
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function FormsPage() {
  const [sliderValue, setSliderValue] = useState(50);
  const [progressValue, setProgressValue] = useState(30);

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Forms</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Inputs, validation, checklists, file uploads and full form components.
        </p>

        <DemoSection title="Input">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" error="Invalid email" />
          <Input label="Disabled" disabled />
        </DemoSection>

        <DemoSection title="Textarea">
          <Textarea label="Message" rows={3} placeholder="Your message..." />
        </DemoSection>

        <DemoSection title="Select">
          <Select
            label="Country"
            options={[{ value: 'lk', label: 'Sri Lanka' }]}
            placeholder="Select"
          />
        </DemoSection>

        <DemoSection title="Checkbox">
          <Checkbox label="Accept terms" />
          <Checkbox label="Disabled" disabled />
        </DemoSection>

        <DemoSection title="Radio">
          <Radio name="gender" value="male" label="Male" />
          <Radio name="gender" value="female" label="Female" />
        </DemoSection>

        <DemoSection title="Toggle">
          <Toggle label="Enable notifications" />
        </DemoSection>

        <DemoSection title="FormErrorMessage">
          <FormErrorMessage variant="error">
            This field is required.
          </FormErrorMessage>
        </DemoSection>

        <DemoSection title="FormFieldGroup">
          <FormFieldGroup>
            <Input label="First name" />
            <Input label="Last name" />
          </FormFieldGroup>
        </DemoSection>

        <DemoSection title="FormSectionWrapper">
          <FormSectionWrapper
            title="Personal Details"
            description="Your basic info"
          >
            <Input label="Name" />
            <Input label="Email" />
          </FormSectionWrapper>
        </DemoSection>

        <DemoSection title="FormValidationSummary">
          <FormValidationSummary
            errors={['Name is required', 'Email invalid']}
          />
          <FormValidationSummary successMessage="Form submitted successfully!" />
        </DemoSection>

        <DemoSection title="ProgressIndicator">
          <ProgressIndicator
            variant="bar"
            value={progressValue}
            label="Upload progress"
          />
          <ProgressIndicator
            variant="steps"
            steps={[
              { id: '1', label: 'Step 1' },
              { id: '2', label: 'Step 2' },
            ]}
            activeStep={0}
          />
        </DemoSection>

        <DemoSection title="FileUploadZone">
          <FileUploadZone label="Upload files" accept="image/*" maxSizeMb={5} />
        </DemoSection>

        <DemoSection title="RequirementsChecklist">
          <RequirementsChecklist
            title="Admission Requirements"
            items={[
              { id: 'birth', label: 'Birth certificate copy', required: true },
              { id: 'photo', label: 'Passport photo', required: true },
            ]}
          />
        </DemoSection>

        <DemoSection title="Slider">
          <Slider
            value={sliderValue}
            onChange={setSliderValue}
            label="Volume"
            showValue
          />
        </DemoSection>

        <DemoSection title="ContactForm (Full)">
          <ContactForm />
        </DemoSection>

        <DemoSection title="FeedbackForm (Full)">
          <FeedbackForm />
        </DemoSection>
      </div>
    </div>
  );
}
