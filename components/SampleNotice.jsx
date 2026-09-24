import { AlertIcon } from '@/components/Icons';

/** Shown on the directory and on profiles while the listings are sample data. */
export default function SampleNotice() {
  return (
    <p className="sample-note" role="note">
      <AlertIcon />
      <span>
        <b>Sample listings.</b> The providers shown here are sample data that demonstrate how the
        directory works. They will be replaced with live, verified providers.
      </span>
    </p>
  );
}
