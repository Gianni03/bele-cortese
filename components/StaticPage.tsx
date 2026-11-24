import { PageScript } from "./PageScript";
import { pages } from "@/content/pages";

type PageSlug = keyof typeof pages;

type StaticPageProps = {
  slug: PageSlug;
  withScripts?: boolean;
};

export function StaticPage({ slug, withScripts = false }: StaticPageProps) {
  const page = pages[slug];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page.style }} />
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
      {withScripts ? <PageScript scripts={page.scripts} /> : null}
    </>
  );
}
