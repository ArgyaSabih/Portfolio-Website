"use client";

import {useEffect, useState} from "react";

export default function ProjectIndex({
  items,
  labelledBy
}: {
  items: {id: string; title: string}[];
  labelledBy: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      {rootMargin: "-25% 0px -60% 0px"}
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol aria-labelledby={labelledBy} className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={"#" + item.id}
              aria-current={isActive ? "true" : undefined}
              className={
                "group flex min-h-[44px] items-center gap-3 py-2 text-sm transition-colors duration-200 lg:min-h-0 lg:py-[0.4rem] " +
                (isActive ? "text-paper" : "text-paper-faint hover:text-paper-dim")
              }
            >
              <span
                aria-hidden="true"
                className={
                  "h-px shrink-0 origin-left bg-accent transition-all duration-200 ease-expo " +
                  (isActive ? "w-6 opacity-100" : "w-2 opacity-40 group-hover:w-4")
                }
              />
              <span>{item.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
