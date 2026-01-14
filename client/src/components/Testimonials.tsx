import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "BreatheEasy has transformed how I understand air quality. The real-time data helps me make informed decisions about outdoor activities.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
  },
  {
    text: "As a parent, this app gives me peace of mind. I can check AQI before taking my kids to the park.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Chen",
    role: "Parent",
  },
  {
    text: "The detailed pollutant breakdown and health suggestions are incredibly helpful for my respiratory condition.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Priya Sharma",
    role: "Health-Conscious User",
  },
  {
    text: "Clean interface, accurate data, and helpful precautions. BreatheEasy is my go-to air quality app.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Martinez",
    role: "Urban Cyclist",
  },
  {
    text: "The map view makes it easy to find areas with better air quality. Essential for my morning runs!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Emily Brown",
    role: "Marathon Runner",
  },
  {
    text: "Finally, an air quality app that's both informative and easy to use. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aisha Khan",
    role: "Environmental Advocate",
  },
  {
    text: "The AQI scale table and suggestions help me understand what the numbers really mean for my health.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "James Wilson",
    role: "Health Professional",
  },
  {
    text: "BreatheEasy's real-time updates keep me informed about pollution levels in my neighborhood.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Lisa Anderson",
    role: "Community Leader",
  },
  {
    text: "Great for planning outdoor activities! The precautions feature is especially useful.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Robert Taylor",
    role: "Outdoor Enthusiast",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
