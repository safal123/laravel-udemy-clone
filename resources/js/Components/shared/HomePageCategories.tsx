import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Cpu,
  BarChart3,
  Palette,
  Camera,
  Languages,
  Music,
  ChevronRight
} from "lucide-react";

type HomePageCategoriesProps = {
  categories: {
    id: number;
    name: string;
    description?: string;
    icon?: React.ReactNode;
    href?: string;
  }[];
};

const HomePageCategories = ({ categories }: HomePageCategoriesProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Define category icons with more modern, professional options
  const categoryIcons = [
    <Code key="code" className="w-6 h-6" />,
    <BookOpen key="book" className="w-6 h-6" />,
    <BarChart3 key="chart" className="w-6 h-6" />,
    <Cpu key="cpu" className="w-6 h-6" />,
    <Palette key="palette" className="w-6 h-6" />,
    <Camera key="camera" className="w-6 h-6" />,
    <Languages key="languages" className="w-6 h-6" />,
    <Music key="music" className="w-6 h-6" />
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="text-sm font-medium text-orange-600 mb-2 tracking-wide">BROWSE BY CATEGORY</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Categories</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Find the perfect course across our diverse range of subjects taught by industry experts
            </p>
          </div>

          <Link
            href="/categories"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors group"
          >
            View all categories
            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/courses?category=${encodeURIComponent(category.name)}&level=&page=1&price=&sort=`}
                className="flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-sm">
                    {categoryIcons[index % categoryIcons.length]}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold ml-3 text-slate-900">{category.name}</h3>
                </div>

                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">
                    {category.description || `Explore our ${category.name} courses and advance your skills with expert instruction.`}
                  </p>

                  <div className="inline-flex items-center text-xs font-medium text-orange-600 group-hover:text-orange-700 transition-colors">
                    Explore courses
                    <ChevronRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageCategories;
