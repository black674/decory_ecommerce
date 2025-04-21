import { Link } from "react-router-dom";
import "./Link.css";

import { FiArrowRight } from "react-icons/fi";

export const ExternalLink = (props) => {
  const { style = true, className, addArrow = true, children, ...rest } = props;

  const linkStyle = style && "link";
  const linkClass = className && className;

  const linkClassName = [linkStyle, linkClass].filter(Boolean).join(" ");

  return (
    <a {...rest} className={linkClassName}>
      {children}
      {addArrow && <FiArrowRight size={18} />}
    </a>
  );
};

export const EnternalLink = (props) => {
  const { style = true, className, addArrow = true, children, ...rest } = props;

  const linkStyle = style && "link";
  const linkClass = className && className;

  const linkClassName = [linkStyle, linkClass].filter(Boolean).join(" ");

  return (
    <Link {...rest} className={linkClassName}>
      {children}
      {addArrow && <FiArrowRight size={18} />}
    </Link>
  );
};
