export default function Card({ children, width = "standard", active = false }) {
  let className =
    "shadow-2xl flex flex-col mx-auto rounded-xl pt-6 h-auto text-center ";

  switch (width) {
    case "small":
      className += " w-48";
      break;
    case "standard":
      className += " w-80";
      break;
    case "large":
      className += " w-96";
      break;
  }

  if (active) {
    className += " bg-primary text-white";
  } else {
    className += " bg-white";
  }
  return <div className={className}>{children}</div>;
}
