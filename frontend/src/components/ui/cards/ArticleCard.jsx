import Link from "@/components/ui/link/Link";
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ title, image, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <article
      className="group cursor-pointer max-w-[357px]"
      onClick={handleClick}
    >
      <div className="relative mb-4 w-full h-[283px] overflow-hidden lg:h-[325px]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="object-cover h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="!font-semibold text-[#23262F] leading-6.5 line-clamp-1 lg:text-xl lg:leading-7">
        {title}
      </h3>
      <div className="mt-2">
        <Link to={link}>Read More</Link>
      </div>
    </article>
  );
}
