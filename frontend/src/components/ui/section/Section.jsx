export default function Section(props) {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={`px-8 lg:px-40 ${className ? className : ""}`}>
      {children}
    </div>
  );
}
