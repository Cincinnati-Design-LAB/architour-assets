export default function NotFoundError() {
  return (
    <main>
      <div className="max-w-4xl py-16 mx-auto text-center">
        <h1 className="mb-8 text-4xl font-black">404 - Page Not Found</h1>
        <p>
          <a
            href="/"
            className="inline-block px-6 py-2 font-medium text-white bg-blue-500 rounded-sm"
          >
            Go Home
          </a>
        </p>
      </div>
    </main>
  );
}
