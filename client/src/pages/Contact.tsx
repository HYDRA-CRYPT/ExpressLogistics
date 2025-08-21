// import React from "react";

// type Props = {};

const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <form className="mt-8 grid gap-4 max-w-xl">
        <input className="input" placeholder="Your Name" />
        <input className="input" placeholder="Email" type="email" />
        <textarea className="input min-h-32" placeholder="Tell us about it" />
        <button className="btn-primary">Send</button>
      </form>
    </section>
  );
};

export default Contact;
