"use client";

import {type CSSProperties, useEffect, useRef, useState} from "react";
import Image from "next/image";

export default function ShotImage({
  src,
  sizes,
  parallax = 6
}: {
  src: string;
  sizes: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      {rootMargin: "800px 0px"}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const image = <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />;

  return (
    <div
      ref={ref}
      data-parallax={parallax}
      style={{"--depth": parallax} as CSSProperties}
      className="absolute inset-0"
    >
      {near ? image : <noscript>{image}</noscript>}
    </div>
  );
}
