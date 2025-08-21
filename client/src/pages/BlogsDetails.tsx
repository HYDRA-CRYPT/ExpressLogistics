import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
const BlogsDetails = () => {
  const { id } = useParams({ from: "/blogs/$id" });
  const { data, isPending } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/posts/${id}`);
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <div className="container px-4 py-16">Loading…</div>;

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="mt-6 text-neutral-700 leading-7">{data.body}</p>
    </section>
  );
};

export default BlogsDetails;
