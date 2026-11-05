"use client";

import {useEffect, useState} from "react";

type Item = {id: string; title: string};
type Group = {id: string; title: string; items: Item[]};

export default function ProjectIndex({groups, labelledBy}: {groups: Group[]; labelledBy: string}) {
  const first = groups[0]?.items[0]?.id ?? "";
  const [active, setActive] = useState(first);

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((item) => item.id));
    const nodes = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
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
  }, [groups]);

  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      {groups.map((group) => (
        <div key={group.id}>
          <p
            id={"index-" + group.id}
            className="mb-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-dim"
          >
            {group.title}
          </p>
          <ol aria-labelledby={"index-" + group.id} className="grid grid-cols-1">
            {group.items.map((item) => {
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
        </div>
      ))}
    </div>
  );
}
