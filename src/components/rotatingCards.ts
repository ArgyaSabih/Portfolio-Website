import gsap from "gsap";

export function placeCards(
  cards: HTMLElement[],
  pos: number,
  {
    spacing,
    reach = 1.1,
    entry = 1,
    lift = 36
  }: {spacing: number; reach?: number; entry?: number; lift?: number}
) {
  const count = cards.length;
  cards.forEach((card, index) => {
    const raw = index - pos;
    const slot = count <= 2 ? raw : ((((raw + count / 2) % count) + count) % count) - count / 2;
    const distance = Math.abs(slot);
    const visibility = gsap.utils.clamp(0, 1, 1 - (distance - reach) / 0.16);
    const scale = gsap.utils.interpolate(1.02, 0.84, Math.min(distance / 1.5, 1)) * (0.86 + entry * 0.14);
    gsap.set(card, {
      x: slot * spacing,
      y: Math.min(distance, 1.3) * lift + (1 - entry) * 180,
      rotate: slot * 5.5,
      scale,
      opacity: visibility * entry,
      zIndex: 100 - Math.round(distance * 20)
    });
  });
}
