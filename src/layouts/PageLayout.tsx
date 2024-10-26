import NavBar from '../components/NavBar';
import NavBarMobile from '../components/NavBarMobile';

function PageLayout({ children }: any) {
  return (
    <div className="w-full flex relative top-0 left-0">
      <NavBar />
      <NavBarMobile />
      <main className="flex flex-col gap-8 p-4 w-full">{children}</main>
    </div>
  );
}

export default PageLayout;
