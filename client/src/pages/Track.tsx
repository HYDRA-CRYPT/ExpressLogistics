import * as React from "react";
import { useNavigate } from "@tanstack/react-router";

const Track = () => {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (code.trim()) {
      navigate({
        to: "/track/$code",
        params: { code: code.trim() },
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Track your shipment</h1>
      <div className="mt-6 flex gap-2 max-w-xl">
        <input
          className="input flex-1"
          placeholder="Enter tracking code e.g. AGL5901114930"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
        />
        <button className="btn-primary" disabled={!code} onClick={handleTrack}>
          Track
        </button>
      </div>
    </section>
  );
};

export default Track;
