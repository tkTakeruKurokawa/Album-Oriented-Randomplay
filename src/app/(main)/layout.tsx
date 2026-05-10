import { Header } from '@/components/ui';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="pt-16">{children}</div>
    </>
  );
};

export default MainLayout;
