import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
// import { api } from "../../services/api";
const Blogs = () => {
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      // Placeholder: replace with your real CMS/blog API
      const res = await fetch("https://dummyjson.com/posts?limit=10");
      return res.json();
    },
  });

  const posts: Array<{ id: number; title: string }> = data?.posts ?? [];

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Insights & Updates</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <Link
              to="/blogs/$id"
              params={{ id: String(p.id) }}
              className="link mt-2 inline-block"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
