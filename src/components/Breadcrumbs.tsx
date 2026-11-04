import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/site-url";

type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1,
        name: item.name, item: siteUrl(item.path),
      })),
    }} />
    <nav aria-label="Breadcrumb" className="data" style={{ marginBottom: 24, fontSize: 12 }}>
      <ol style={{ display: "flex", flexWrap: "wrap", gap: "8px 12px", listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item, index) => <li key={item.path} style={{ display: "flex", gap: 12, minWidth: 0 }}>
          {index > 0 && <span aria-hidden="true">/</span>}
          {index === items.length - 1
            ? <span aria-current="page">{item.name}</span>
            : <Link href={item.path}>{item.name}</Link>}
        </li>)}
      </ol>
    </nav>
  </>;
}
