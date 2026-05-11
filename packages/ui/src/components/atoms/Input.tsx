'use client';

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  id?: string;
  name?: string;
  className?: string;
};

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  id,
  name,
  className = '',
}: Props) {
  return (
    <div className={`flex flex-col gap-space-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="font-body text-label uppercase tracking-[0.15em] text-text-primary"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          'w-full font-body text-body text-text-primary placeholder:text-text-muted',
          'px-space-4 py-space-3 rounded-sm border outline-none',
          'transition-all duration-fast ease-snap',
          error
            ? 'border-semantic-error-base bg-surface-elevated'
            : 'border-border-default bg-surface-elevated',
          'focus:border-gold-base focus:shadow-elevation-1',
          disabled
            ? 'bg-surface-deep text-text-muted cursor-not-allowed opacity-60'
            : '',
        ].join(' ')}
      />

      {error && (
        <span className="font-body text-caption text-semantic-error-base flex items-center gap-space-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
