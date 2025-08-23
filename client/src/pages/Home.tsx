import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMapPin, FiZap, FiShield } from "react-icons/fi";
import { TestimonialsSimple } from "../components/Testimony";

const items = [
  {
    icon: FiZap,
    title: "Fast shipping",
    desc: "Same-day processing and optimized routes.",
  },
  {
    icon: FiMapPin,
    title: "Live tracking",
    desc: "Know where your package is, at all times.",
  },
  {
    icon: FiShield,
    title: "Secure handling",
    desc: "Tamper-proof workflow from pickup to delivery.",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Logistics at <span className="text-primary">lightning speed</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 max-w-prose">
              Ship worldwide with real-time tracking, beautiful invoices, and
              remarkable customer care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/track" className="btn-primary">
                Track a package
              </Link>
              <Link to="/contact" className="btn-outline">
                Talk to sales
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/20 shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="card"
            >
              <it.icon className="size-6" />
              <h3 className="mt-3 font-semibold text-lg">{it.title}</h3>
              <p className="text-sm text-neutral-600">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section>
        <TestimonialsSimple />
      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-primary/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black">
              Start shipping smarter
            </h2>
            <p className="mt-2 text-neutral-700">
              Create shipments, track instantly, and share stunning invoices.
            </p>
          </div>
          <Link to="/track" className="btn-primary">
            Track now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
