import { titleProps } from "../interface";

function Logo({ title1, title2 }: titleProps) {
  return (
    <h1 className="Logo">
      <span>{title1} </span>
      {title2}
    </h1>
  );
}

export default Logo;
