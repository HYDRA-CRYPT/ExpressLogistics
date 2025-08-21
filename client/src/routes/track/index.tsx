import { createFileRoute } from "@tanstack/react-router";
import Track from "../../pages/Track";

export const Route = createFileRoute("/track/")({
  component: Track,
});
