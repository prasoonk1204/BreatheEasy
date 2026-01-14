import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

export const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "https://shadcnblocks.com",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="py-20 bg-emerald-50 dark:bg-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row lg:gap-16">
          <div className="md:w-1/2">
            <h4 className="mb-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
            <Button className="mt-6" asChild>
              <a href={buttonUrl}>
                {buttonText} <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <div className="md:w-1/3">
            <ul className="flex flex-col space-y-3 text-base font-medium">
              {items.map((item, idx) => (
                <li className="flex items-center text-gray-700 dark:text-gray-300" key={idx}>
                  <Check className="mr-4 size-5 flex-shrink-0 text-emerald-600 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
