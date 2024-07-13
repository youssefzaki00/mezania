import { ButtonProps } from "../interface";

function Button({ content }: ButtonProps) {
  return (
    <button className="button" type="button">
      {content}
    </button>
  );
}

export default Button;
