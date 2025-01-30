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
  // Define seven different gradient colors
  const gradientClasses = [
    "from-blue-700 to-blue-500 hover:from-blue-500 hover:to-blue-700 transition-all", // Blue
    "from-green-700 to-green-300 hover:from-green-300 hover:to-green-700 transition-all", // Green
    "from-yellow-200 to-yellow-500 hover:from-yellow-500 hover:to-yellow-200 transition-all", // Yellow
    "from-pink-700 to-pink-300 hover:from-pink-300 hover:to-pink-700 transition-all", // Pink
    "from-orange-300 to-orange-500 hover:from-orange-500 hover:to-orange-300 transition-all", // Orange
    "from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-400 transition-all", // Teal
    "from-red-400 to-red-500 hover:from-red-500 hover:to-red-400 transition-all", // Red
  ];

  // Define Lucide icons for each category
  const categoryIcons = [
    <Cpu key="cpu" className="w-12 h-12" />, // Computer Engineering
    <UserCircle key="user" className="w-12 h-12" />, // Personal Development
    <HardHat key="hardhat" className="w-12 h-12" />, // Construction
    <Leaf key="leaf" className="w-12 h-12" />, // Environmental Engineering
    <Camera key="camera" className="w-12 h-12" />, // Photography
    <Paintbrush key="paintbrush" className="w-12 h-12" />, // Design
    <Hammer key="hammer" className="w-12 h-12" />, // Crafts
    <Award key="award" className="w-12 h-12" />, // Leadership
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category?.href || "#"}
              className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className={`bg-gradient-to-r ${gradientClasses[index % gradientClasses.length]} p-8 text-white text-center min-h-[200px] flex flex-col justify-center`}
              >
                <div className="flex justify-center">
                  {categoryIcons[index % categoryIcons.length]}
                </div>
                <h3 className="text-2xl font-semibold mt-6">{category.name}</h3>
              </div>
              <div className="bg-white p-6">
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-blue-600 font-semibold group-hover:text-blue-800">
                    Explore
                  </span>
                  <ChevronRight
                    size={24}
                    className="text-gray-600 group-hover:text-blue-600"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageCategories;
