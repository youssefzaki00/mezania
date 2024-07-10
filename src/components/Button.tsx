interface ButtonProps {
  content: string;
}
function Button({ content }: ButtonProps) {
  return (
    <button className="button" type="button">
      {content}
    </button>
  );
}

export default Button;
