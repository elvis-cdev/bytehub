import Navbar from "@/src/components/marketing/Navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto flex max-w-7xl items-center justify-center px-6 py-32">
          <div className="max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Build • Showcase • Get Hired
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl">
              Discover developers through
              <span className="text-blue-600"> their work.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              ByteHub Kenya helps student developers build professional
              portfolios, showcase real software projects, and connect with
              businesses looking for exceptional talent.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
