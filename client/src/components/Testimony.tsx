import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Aegis Express transformed our supply chain. Their same-day delivery service helped us reduce inventory costs by 30% while improving customer satisfaction.",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    name: "Sarah Chen",
    role: "Operations Director, TechFlow Industries",
  },
  {
    quote:
      "The real-time tracking and proactive communication kept our clients informed every step of the way. Game changer for our business.",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
    name: "Michael Rodriguez",
    role: "CEO, Global Manufacturing Solutions",
  },
  {
    quote:
      "From urgent medical supplies to routine deliveries, Aegis Express handles everything with incredible reliability. 99.5% on-time rate isn't just a number.",
    avatar:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
    name: "Dr. Amanda Foster",
    role: "Chief Procurement Officer, Metropolitan Health",
  },
  {
    quote:
      "Their international shipping service expanded our market reach to 15 new countries. The customs handling alone saved us weeks of headaches.",
    avatar:
      "https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg?auto=compress&cs=tinysrgb&w=200",
    name: "James Thompson",
    role: "Export Manager, Precision Electronics",
  },
];

const DURATION = 5000; // ms
const BAR_WIDTH = 50;
const CIRCLE_SIZE = 12;

export function TestimonialsSimple() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="bg-background relative flex flex-col items-center py-16">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
        <div className="min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
            >
              “{testimonials[index].quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <img
                src={testimonials[index].avatar}
                alt={testimonials[index].name + " avatar"}
                width={48}
                height={48}
                className="bg-foreground/10 h-12 w-12 rounded-full border object-cover"
              />
              <div className="border-muted-foreground/30 mx-4 h-8 border-l" />
              <div className="text-left">
                <div className="text-foreground text-lg font-medium italic">
                  {testimonials[index].name}
                </div>
                <div className="text-muted-foreground text-base">
                  {testimonials[index].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress Bar & Circles Indicator */}
        <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
          {testimonials.map((_, i) => {
            const isActive = i === index;
            return (
              <motion.span
                key={i}
                layout
                initial={false}
                animate={{
                  width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: isActive ? 8 : 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="bg-foreground/10 relative block overflow-hidden"
                style={{
                  minWidth: CIRCLE_SIZE,
                  maxWidth: BAR_WIDTH,
                  border: "none",
                }}
              >
                {isActive && (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="bg-brand absolute top-0 left-0 h-full rounded-lg"
                  />
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
