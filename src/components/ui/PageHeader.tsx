interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-8 lg:mb-12">
      <h1 className="mb-2 text-3xl lg:mb-3 lg:text-5xl">{title}</h1>
      {subtitle ? (
        <p className="text-sm text-[var(--spotify-light-gray)] lg:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
