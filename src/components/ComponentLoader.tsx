import loadingSvg from '../assets/loading.svg';

function ComponentLoader({ children, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full h-[400px] bg-slate-700 font-bold rounded-2xl animate-pulse p-4 flex items-center justify-center">
        <img
          src={loadingSvg}
          alt="loading"
          className="object-contain w-full h-[200px]"
        />
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default ComponentLoader;
