import Link from "@/components/ui/link/Link";
import Section from "@/components/ui/section/Section";
import ArticleCard from "@/components/ui/cards/ArticleCard";

const articles = [
  {
    title: "Decor your bedroom",
    image: "/assets/images/articles/bedroom-decor.png",
    link: "/",
  },
  {
    title: "Modern kitchen ideas",
    image: "/assets/images/articles/kitchen-modern.png",
    link: "/",
  },
  {
    title: "Living room setup",
    image: "/assets/images/articles/living-room.png",
    link: "/",
  },
];

export default function ArticlesSection() {
  return (
    <Section className="py-10 space-y-10 overflow-auto">
      <header className="flex items-center justify-between gap-4">
        <h2 className="!font-poppins text-[34px] leading-9.5 lg:text-[40px] lg:leading-11">
          Articles
        </h2>
        <Link to="/">More Articles</Link>
      </header>
      <div className="flex items-center justify-center gap-6 max-lg:flex-wrap">
        {articles.map((data, index) => (
          <ArticleCard key={index} {...data} />
        ))}
      </div>
    </Section>
  );
}
