import { Quote, Star } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import StarRating from "../common/StarRating";
import { reviews } from "../../data/content";

/** Customer testimonials — three verified reviews with rating and location. */
const Reviews = () => (
  <Section id="reviews" tone="surface">
    <SectionHeading
      icon={Star}
      title="What Our Customers Say"
      subtitle="Real reviews. Real happiness."
      linkHref="#reviews"
    />

    <ul className="grid gap-3 md:grid-cols-3 lg:gap-4">
      {reviews.map((review) => (
        <li key={review.id}>
          <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-canvas p-4 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md sm:p-5">
            <Quote
              size={26}
              aria-hidden="true"
              className="absolute right-4 top-4 text-gold-200"
            />

            <StarRating value={review.rating} size={14} />

            <blockquote className="mt-3 flex-1">
              <p className="text-[13px] font-bold text-ink-900 sm:text-sm">
                {review.title}
              </p>
              <p className="mt-1.5 text-xs leading-6 text-ink-500 sm:text-[13px]">
                {review.body}
              </p>
            </blockquote>

            <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
              <img
                src={review.avatar}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />

              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-ink-900">
                  {review.name}
                </span>
                <span className="block truncate text-[11px] text-ink-500">
                  {review.location} · Verified buyer
                </span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  </Section>
);

export default Reviews;
