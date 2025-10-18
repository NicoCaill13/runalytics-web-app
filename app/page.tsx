export default function HomePage() {
  return (
    <div className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard (MVP)</h1>
      <p className="text-neutral-700">
        Accès autorisé (protégé par le middleware).
      </p>
    </div>
  );
}
