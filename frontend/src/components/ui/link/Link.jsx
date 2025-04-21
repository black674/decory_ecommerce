import { EnternalLink, ExternalLink } from "./Links";

const RenderLink = ({ type = "enternal", ...props }) => {
  switch (type) {
    case "enternal":
      return <EnternalLink {...props} />;
    case "external":
      return <ExternalLink {...props} />;
    default:
      return (
        <h4 className="text-red-500">
          there is no input contain this type please try anther one
        </h4>
      );
  }
};

export default function Link(props) {
  return <RenderLink {...props} />;
}
