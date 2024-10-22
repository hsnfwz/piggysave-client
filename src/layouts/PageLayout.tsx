
import NavBar from '../components/NavBar';

function PageLayout({ children }) {

  return (
    <div className="w-full flex flex-col">
      <NavBar />
      <main className="flex flex-col gap-16">{children}</main>
    </div>
  );
}

export default PageLayout;
