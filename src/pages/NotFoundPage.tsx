import PageLayout from '../layouts/PageLayout';

function NotFoundPage() {
  return (
    <PageLayout>
      <div className="w-full h-screen flex justify-center items-center bg-rose-300">
        <h1 className="text-2xl text-white font-bold">Not Found</h1>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
