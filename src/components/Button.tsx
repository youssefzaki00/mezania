import { ButtonProps } from "../interface";

function Button({ content, onClick }: ButtonProps) {
  return (
    <button className="button" type="button" onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;
