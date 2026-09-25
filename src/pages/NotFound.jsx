import { Home as HomeIcon } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";

/**
 * Catch-all route for any URL that doesn't match a page. Kept as its own
 * page (not a redirect) so a bad link tells the visitor something,
 * rather than silently bouncing them to the homepage.
 */
const NotFound = () => (
  <Section tone="canvas" className="min-h-[60vh]">
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="font-display text-6xl font-bold text-navy-800">404</p>

      <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
        Page not found
      </h1>

      <p className="max-w-sm text-sm text-ink-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Button href="/" variant="primary" size="md" className="mt-2">
        <HomeIcon size={16} aria-hidden="true" />
        Back to Home
      </Button>
    </div>
  </Section>
);

export default NotFound;
