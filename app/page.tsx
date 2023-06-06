export default function Home() {
  return (
    <main>
      <div className="max-w-4xl py-16 mx-auto text-center">
        <h1 className="mb-8 text-4xl font-black">Clearyst Assets</h1>
        <p>
          <a
            href="/auth/signin"
            className="inline-block px-6 py-2 font-medium text-white bg-blue-500 rounded-sm"
          >
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
