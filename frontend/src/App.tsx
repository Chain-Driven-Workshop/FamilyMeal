import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service?: string;
};

export default function App() {
  const [result, setResult] = useState<HealthResponse>({ status: "loading" });

  useEffect(() => {
    fetch("/api/v1/health")
      .then((response) => response.json() as Promise<HealthResponse>)
      .then((data) => setResult(data))
      .catch(() => setResult({ status: "error", service: "recipe-api" }));
  }, []);

  return (
    <main className="app-shell">
      <h1>Recipe Frontend</h1>
      <p>React app running on Vite.</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
