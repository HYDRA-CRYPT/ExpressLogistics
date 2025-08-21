import { createFileRoute } from "@tanstack/react-router";
import TrackDetails from "../../pages/TrackDetails";

export const Route = createFileRoute("/track/$code")({
  component: TrackDetails,
});
