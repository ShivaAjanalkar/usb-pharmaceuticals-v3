import Link from "next/link";
import { Arrow } from "@/components/SiteNav";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        tag="404"
        title="That page is not here"
        sub="The link may be out of date, or the page may not have been published yet."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Link href="/" className="btn btn--copper">
            Back to the home page <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
