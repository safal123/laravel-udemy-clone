import { Course } from "@/types";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { useState } from "react";
import { Card } from "@/Components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import Editor from "@/Components/shared/Editor";
import TagInputField from "@/Components/shared/form-components/TagInputField";

interface CourseFormProps {
  course?: Course;
  mode: "create" | "edit";
  categories: { id: string; name: string }[];
}

const LANGUAGES = [
  "English",
];

const CourseForm = ({ course, mode, categories }: CourseFormProps) => {
  const { data, setData, post, put, processing, errors } = useForm({
    title: course?.title || "",
    slug: course?.slug || "",
    description: course?.description || "",
    price: course?.price?.toString() || "",
    discount_price: course?.discount_price?.toString() || "",
    level: course?.level || "beginner",
    language: course?.language || "English",
    duration_minutes: course?.duration_minutes?.toString() || "",
    requirements: course?.requirements || "",
    target_audience: course?.target_audience || "",
    what_you_will_learn: course?.what_you_will_learn || "",
    category_id: course?.category_id || "",
    tags: course?.tags || "",
    is_featured: course?.is_featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      post(route("teachers.courses.store"));
    } else {
      put(route("teachers.courses.update", course?.id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="grid gap-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Course Title</Label>
              <div className="md:col-span-2">
                <Input
                  value={data.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("title", e.target.value)}
                  placeholder="Enter course title"
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">URL Slug</Label>
              <div className="md:col-span-2">
                <Input
                  value={data.slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("slug", e.target.value)}
                  placeholder="course-url-slug"
                  className={cn(errors.slug && "border-red-500")}
                />
                {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Description</Label>
              <div className="md:col-span-2">
                <div className={cn("", errors.description && "border-red-500")}>
                  <Editor
                    value={data.description}
                    onChange={(value: string) => setData("description", value)}
                    placeholder="Describe your course..."
                  />
                </div>
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Category</Label>
              <div className="md:col-span-2">
                <Select value={data.category_id} onValueChange={value => setData("category_id", value)}>
                  <SelectTrigger className={cn(errors.category_id && "border-red-500")}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.length > 0 ? (
                      categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-categories" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.category_id && <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Level</Label>
              <div className="md:col-span-2">
                <Select value={data.level} onValueChange={value => setData("level", value)}>
                  <SelectTrigger className={cn(errors.level && "border-red-500")}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="all-levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && <p className="text-sm text-red-500 mt-1">{errors.level}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Language</Label>
              <div className="md:col-span-2">
                <Select value={data.language} onValueChange={value => setData("language", value)}>
                  <SelectTrigger className={cn(errors.language && "border-red-500")}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.language && <p className="text-sm text-red-500 mt-1">{errors.language}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Duration (minutes)</Label>
              <div className="md:col-span-2">
                <Input
                  type="number"
                  value={data.duration_minutes}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("duration_minutes", e.target.value)}
                  placeholder="Total duration in minutes"
                  className={cn(errors.duration_minutes && "border-red-500")}
                />
                {errors.duration_minutes && <p className="text-sm text-red-500 mt-1">{errors.duration_minutes}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Price ($)</Label>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("price", e.target.value)}
                    placeholder="Regular price"
                    className={cn(errors.price && "border-red-500")}
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                </div>
                <div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.discount_price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("discount_price", e.target.value)}
                    placeholder="Discount price (optional)"
                    className={cn(errors.discount_price && "border-red-500")}
                  />
                  {errors.discount_price && <p className="text-sm text-red-500 mt-1">{errors.discount_price}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Requirements</Label>
              <div className="md:col-span-2">
                <Textarea
                  value={data.requirements}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData("requirements", e.target.value)}
                  placeholder="Basic knowledge of HTML and CSS, Familiarity with JavaScript fundamentals, A computer with an internet connection"
                  rows={4}
                  className={cn(errors.requirements && "border-red-500")}
                />
                {errors.requirements && <p className="text-sm text-red-500 mt-1">{errors.requirements}</p>}
                <p className="text-sm text-gray-500 mt-1">List prerequisites needed before taking this course. Separate each requirement with a comma.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Target Audience</Label>
              <div className="md:col-span-2">
                <Textarea
                  value={data.target_audience}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData("target_audience", e.target.value)}
                  placeholder="Beginners who want to learn web development, Designers looking to expand their coding skills, Students preparing for a career in tech"
                  rows={4}
                  className={cn(errors.target_audience && "border-red-500")}
                />
                {errors.target_audience && <p className="text-sm text-red-500 mt-1">{errors.target_audience}</p>}
                <p className="text-sm text-gray-500 mt-1">Describe who would benefit most from this course. Separate each audience type with a comma.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">What You Will Learn</Label>
              <div className="md:col-span-2">
                <Textarea
                  value={data.what_you_will_learn}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData("what_you_will_learn", e.target.value)}
                  placeholder="Build responsive websites using modern CSS techniques, Create interactive user interfaces with JavaScript, Deploy your applications to production environments"
                  rows={4}
                  className={cn(errors.what_you_will_learn && "border-red-500")}
                />
                {errors.what_you_will_learn && <p className="text-sm text-red-500 mt-1">{errors.what_you_will_learn}</p>}
                <p className="text-sm text-gray-500 mt-1">List the key skills and knowledge students will gain. Separate each point with a comma.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Label className="text-sm font-medium pt-2">Tags</Label>
              <div className="md:col-span-2">
                <TagInputField
                  label=""
                  name="tags"
                  value={data.tags}
                  onChange={(value) => setData("tags", value)}
                  error={errors.tags}
                  helpText="Add relevant tags to help students find your course (e.g., programming, web development, react)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label className="text-sm font-medium">Featured Course</Label>
              <div className="md:col-span-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Featured</div>
                  <p className="text-sm text-gray-500">Show this course in featured sections</p>
                </div>
                <Switch
                  checked={data.is_featured}
                  onCheckedChange={checked => setData("is_featured", checked)}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={processing}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === "create" ? "Creating..." : "Updating..."}
              </>
            ) : (
              <>{mode === "create" ? "Create Course" : "Update Course"}</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
