import { Header } from '@/components/ui/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
