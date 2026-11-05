"use client";

import {type CSSProperties, useEffect, useRef, useState} from "react";
import Image from "next/image";

export default function ShotImage({
  src,
  extra,
  sizes,
  parallax = 6
}: {
  src: string;
  extra?: string;
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
      {extra ? (
        <div data-scene-alt className="absolute inset-0 opacity-0">
          {near ? <Image src={extra} alt="" fill sizes={sizes} className="object-cover object-left-top" /> : null}
        </div>
      ) : null}
    </div>
  );
}
