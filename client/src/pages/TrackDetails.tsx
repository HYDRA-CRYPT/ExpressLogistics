import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const TrackDetails = () => {
  const { code } = useParams({ from: "/track/$code" });

  const { data, isPending, isError } = useQuery({
    queryKey: ["delivery", code],
    queryFn: async () => {
      const res = await api.get(`/deliveries/track/${code}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "If-None-Match": "",
        },
      });
      return res.data;
    },
  });

  if (isPending) {
    return <div className="container px-4 py-16">Loading…</div>;
  }

  if (isError || !data) {
    return <div className="container px-4 py-16">Not found</div>;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{data.trackingCode}</h1>
        <a
          className="btn-outline"
          href={`/api/deliveries/track/${data.trackingCode}/invoice.pdf`}
        >
          Download invoice
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold">Route History</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.history?.length ? (
              data.history.map((h: any, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-black/80" />
                  <div>
                    <p className="font-medium">{h.description || "Update"}</p>
                    <p className="text-neutral-600">
                      {new Date(h.time).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-neutral-600">No updates yet.</li>
            )}
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold">Summary</h3>
          <p className="mt-2 text-sm text-neutral-700">
            {data.sender?.country} → {data.receiver?.country}
          </p>
          <p className="text-sm text-neutral-700">Status: {data.status}</p>
          {data.invoiceUrl && (
            <a
              className="link mt-2 inline-block"
              href={data.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View invoice in Cloudinary →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackDetails;
