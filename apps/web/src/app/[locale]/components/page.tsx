'use client';

import {
  Checkbox,
  Radio,
  Toggle,
  Badge,
  Button,
  Input,
  Spinner,
  Textarea,
  ToolTip,
  EyebrowLabel,
  FormErrorMessage,
  FormFieldGroup,
  InlineHelpText,
  Tag,
} from 'packages/ui/src';

export default function Components() {
  return (
    <>
      <h2>Atoms</h2>
      <h3>Buttons</h3>
      <div>
        <Button variant="primary" size="md">
          Click me
        </Button>
        <Button variant="secondary" size="md">
          Click me
        </Button>
        <Button variant="ghost" size="md">
          Click me
        </Button>
        <Button variant="primary" size="sm">
          Click me
        </Button>
        <Button variant="secondary" size="sm">
          Click me
        </Button>
        <Button variant="ghost" size="sm">
          Click me
        </Button>
        <Button variant="primary" size="lg">
          Click me
        </Button>
        <Button variant="secondary" size="lg">
          Click me
        </Button>
        <Button variant="ghost" size="lg">
          Click me
        </Button>
      </div>

      <h3>Input</h3>
      <div>
        <Input label="Username" />
      </div>

      <h3>Spinner</h3>
      <div>
        <Spinner></Spinner>
      </div>

      <h3>Badge</h3>
      <div>
        <Badge variant="category" label="Category" />
        <Badge variant="status" status="published" />
        <Badge variant="achievement" label="Achievement" />
      </div>
      <h3>Textarea</h3>
      <div>
        <Textarea label="Description" />
      </div>
      <h3>Checkbox</h3>
      <div>
        <Checkbox label="I agree to the terms and conditions" />
      </div>
      <h3>Radio</h3>
      <div>
        <Radio value="Value" label="Lable" name="radio-group" />
      </div>
      <h3>Toggle</h3>
      <div>
        <Toggle label="Enable notifications" />
      </div>

      <h3>ToolTip</h3>
      <div>
        <ToolTip content="This is a tooltip">
          <Button variant="primary" size="md">
            Hover me
          </Button>
        </ToolTip>
      </div>
      <h3>EyebrowLabel</h3>
      <div>
        <EyebrowLabel>Section Title</EyebrowLabel>
      </div>

      <h3>FormErrorMessage</h3>
      <div>
        <FormErrorMessage>This is a form error message.</FormErrorMessage>
      </div>

      <h3>FormFeildGroup</h3>
      <div>
        <FormFieldGroup>
          <Input label="First Name" />
          <Input label="Last Name" />
        </FormFieldGroup>
      </div>

      <h3>InlineHelpText</h3>
      <div>
        <InlineHelpText>In line Help Text</InlineHelpText>
      </div>

      <h3>InlineLink</h3>
      <div>
        <InlineHelpText>
          Need help? <a href="#">Contact support</a>
        </InlineHelpText>
      </div>

      <h3>Tag</h3>
      <div>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
        <Tag label="Tag 3" />
      </div>

      <h3>ToolTip</h3>
      <div>
        <ToolTip content="This is a tooltip">
          <Button variant="primary" size="md">
            Hover me
          </Button>
        </ToolTip>
      </div>
    </>
  );
}
