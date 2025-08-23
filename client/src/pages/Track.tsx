import * as React from "react";
import { useNavigate } from "react-router-dom";
import StepperUI from "../components/title-status";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Track = () => {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (code.trim()) {
      navigate(`/track/${code.trim()}`);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Track your shipment</h1>
      <div className="">
        <StepperUI />
      </div>
      <div className="mt-6 flex gap-2 max-w-xl">
        <Input
          className="input flex-1"
          placeholder="Enter tracking code e.g. AGL5901114930"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
        />
        <Button
          className="btn-secondary"
          disabled={!code}
          onClick={handleTrack}
        >
          Track
        </Button>
      </div>
    </section>
  );
};

export default Track;
