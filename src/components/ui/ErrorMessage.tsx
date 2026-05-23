import Link from 'next/link';

interface ErrorMessageProps {
  title: string;
  linkHref: string;
  linkLabel: string;
}

export const ErrorMessage = ({
  title,
  linkHref,
  linkLabel,
}: ErrorMessageProps) => {
  return (
    <section className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl">{title}</h1>
        <Link
          href={linkHref}
          className="text-[var(--spotify-green)] hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  );
};
