import React, { useContext } from "react";


export default function FormSection({ children, title }) {
  return (
    <section className="space-y-4">
      <p className="font-bold text-darkPurple">{title}</p>
      {children}
    </section>
  );
}
