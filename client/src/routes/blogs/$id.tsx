import { createFileRoute } from "@tanstack/react-router";
import BlogsDetails from "../../pages/BlogsDetails";

export const Route = createFileRoute("/blogs/$id")({
  component: BlogsDetails,
});
