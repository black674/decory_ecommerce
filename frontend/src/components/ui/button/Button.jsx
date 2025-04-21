import "./button.css";

const variants = {
  solid: {
    primary: "solid_primary",
  },
  outline: {
    primary: "outline_primary",
  },
};

export default function Button(props) {
  const {
    children,
    className,
    variant = "solid",
    color = "primary",
    loading = false,
    ...rest
  } = props;
  const variantClass = variants[variant][color];
  const buttonClass = [variantClass, className].filter(Boolean).join(" ");
  return (
    <button className={buttonClass} {...rest}>
      {loading ? <h3>Loading...</h3> : children}
    </button>
  );
}
