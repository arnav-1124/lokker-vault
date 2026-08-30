import Link from "next/link";
import { appConfig } from "@/config/app";

/*
  Temporary root placeholder. The marketing site and application shell are
  future moves (see PRODUCT.md). Do not build them out here.
*/
export default function PlaceholderPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background text-foreground">
      <p className="text-heading font-semibold tracking-label">
        {appConfig.name.toUpperCase()}
      </p>
      <p className="text-caption text-muted-foreground">
        {appConfig.tagline} — under active development.
      </p>
      <Link
        href="/design"
        className="text-caption text-primary underline-offset-4 hover:underline"
      >
        Design system preview →
      </Link>
    </div>
  );
}
