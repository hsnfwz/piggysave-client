import loadingSvg from '../assets/loading.svg';

function PageLoader() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-transparent animate-pulse p-4">
      <img
        src={loadingSvg}
        alt="loading"
        className="object-contain w-full h-[400px]"
      />
    </div>
  );
}

export default PageLoader;
