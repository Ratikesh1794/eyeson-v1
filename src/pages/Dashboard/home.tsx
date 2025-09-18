export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-2xl font-bold min-h-[calc(100vh-12rem)] bg-background-primary text-text-primary">
      <h1 className="text-accent-primary mb-4">HomePage</h1>
      <div className="bg-accent-secondary text-background-primary p-4 rounded-lg mb-4">
        Test Color Box
      </div>
      <p className="text-text-secondary mb-2">Secondary text color</p>
      <p className="text-text-tertiary">Tertiary text color</p>
    </div>
  );
}
