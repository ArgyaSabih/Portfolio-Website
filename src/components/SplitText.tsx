import {Fragment} from "react";

export default function SplitText({text, className = ""}: {text: string; className?: string}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-hidden="true">
      {words.map((word, w) => (
        <Fragment key={`w-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <span key={`c-${w}-${c}`} className="char">
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? <span className="char-space" /> : null}
        </Fragment>
      ))}
    </span>
  );
}
