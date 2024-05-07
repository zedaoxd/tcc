import Section from "@/components/shared/section";
import useLatestArticles from "./useLatestArticles";
import CardArticle from "./components/card-article";

export default function LatestArticles() {
  const { articles, ButtonViewAllArticles } = useLatestArticles();

  return (
    <Section
      title="Latest articles"
      subtitle="Explore our Free Acticles"
      action={ButtonViewAllArticles}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {articles.map((article) => (
          <CardArticle key={article.id} {...article} />
        ))}
      </div>
    </Section>
  );
}
