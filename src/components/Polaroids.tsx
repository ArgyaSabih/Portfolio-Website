import Image from "next/image";

const prints = [
  {src: "/hero.jpg", rest: -8, place: "left-0 top-8", tape: "-rotate-[5deg] left-1/2 -translate-x-1/2"},
  {src: "/hero1.jpg", rest: 6, place: "left-[44%] top-0", tape: "rotate-[4deg] left-1/2 -translate-x-1/2"}
];

export default function Polaroids() {
  return (
    <div
      data-polaroids
      aria-hidden="true"
      className="relative mt-14 h-[15.5rem] w-full max-w-[25rem] md:h-[19rem]"
    >
      {prints.map((print, i) => (
        <figure
          key={print.src}
          data-polaroid={i}
          data-rest={print.rest}
          style={{transform: `rotate(${print.rest}deg)`}}
          className={
            "absolute w-[56%] bg-paper p-2.5 pb-9 shadow-[0_24px_52px_rgb(0_0_0/0.45),0_4px_12px_rgb(0_0_0/0.3)] md:p-3 md:pb-11 " +
            print.place
          }
        >
          <span
            className={
              "absolute -top-3 z-10 block h-6 w-20 bg-accent/60 shadow-[0_2px_8px_rgb(0_0_0/0.18)] md:w-24 " +
              print.tape
            }
          />
          <div className="relative aspect-square overflow-hidden bg-ink-raised">
            <Image
              src={print.src}
              alt=""
              fill
              sizes="(min-width: 768px) 14rem, 46vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
