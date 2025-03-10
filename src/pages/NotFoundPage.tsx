import logoSvg from '../assets/logo.svg';
import pageNotFoundSvg from '../assets/page_not_found.svg';

function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
      <img
        src={pageNotFoundSvg}
        alt="not-found"
        className="object-contain w-full h-[400px]"
      />
      <a
        href="/"
        className="flex gap-2 items-center px-4 py-2 border border-slate-700 hover:bg-slate-700 rounded"
      >
        <img src={logoSvg} alt="logo" className="object-contain h-[40px]" />
        <h1 className="text-2xl font-bold">PiggySave</h1>
      </a>
    </div>
  );
}

export default NotFoundPage;
