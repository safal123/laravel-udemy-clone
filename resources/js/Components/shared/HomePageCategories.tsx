import { Link } from "@inertiajs/react";
import {
  ChevronRight,
  Cpu,
  UserCircle,
  HardHat,
  Leaf,
  Camera,
  Paintbrush,
  Hammer,
  Award,
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
  // Define gradient styles for each category
  const gradientClasses = [
    "from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600", // Blue
    "from-green-600 to-green-400 hover:from-green-400 hover:to-green-600", // Green
    "from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400", // Yellow
    "from-pink-600 to-pink-400 hover:from-pink-400 hover:to-pink-600", // Pink
    "from-orange-500 to-orange-300 hover:from-orange-300 hover:to-orange-500", // Orange
    "from-teal-500 to-teal-300 hover:from-teal-300 hover:to-teal-500", // Teal
    "from-red-500 to-red-400 hover:from-red-400 hover:to-red-500", // Red
  ];

  // Define category icons
  const categoryIcons = [
    <Cpu key="cpu" className="w-12 h-12 text-white" />, // Engineering
    <UserCircle key="user" className="w-12 h-12 text-white" />, // Personal Development
    <HardHat key="hardhat" className="w-12 h-12 text-white" />, // Construction
    <Leaf key="leaf" className="w-12 h-12 text-white" />, // Environment
    <Camera key="camera" className="w-12 h-12 text-white" />, // Photography
    <Paintbrush key="paintbrush" className="w-12 h-12 text-white" />, // Design
    <Hammer key="hammer" className="w-12 h-12 text-white" />, // Crafts
    <Award key="award" className="w-12 h-12 text-white" />, // Leadership
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category?.href || "#"}
              className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div
                className={`bg-gradient-to-r ${gradientClasses[index % gradientClasses.length]} p-8 text-white text-center min-h-[200px] flex flex-col items-center justify-center rounded-t-lg transition-all duration-300`}
              >
                {categoryIcons[index % categoryIcons.length]}
                <h3 className="text-2xl font-semibold mt-4">{category.name}</h3>
              </div>
              <div className="bg-white p-6 flex items-center justify-center border-t border-gray-200">
                <span className="text-blue-600 font-semibold group-hover:text-blue-800 transition-all">
                  Explore
                </span>
                <ChevronRight
                  size={24}
                  className="text-gray-600 ml-2 group-hover:text-blue-600 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageCategories;
