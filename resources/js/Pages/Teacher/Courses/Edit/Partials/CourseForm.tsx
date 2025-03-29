import LoadingButton from '@/Components/shared/button/LoadingButton'
import { Course } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/Components/ui/tabs'
import { Card, CardContent } from '@/Components/ui/card'
import { PenIcon, BookOpenIcon, CheckCircleIcon, VideoIcon, DollarSignIcon } from 'lucide-react'
import {
  TextInputField,
  NumberInputField,
  TextareaField,
  SelectField,
  CheckboxField,
  RichEditorField,
  TagInputField
} from './FormComponents'

// Import constants to match with backend
const LEVEL_BEGINNER = 'beginner';
const LEVEL_INTERMEDIATE = 'intermediate';
const LEVEL_ADVANCED = 'advanced';
const LEVEL_ALL_LEVELS = 'all-levels';

type CourseFormProps = {
  course?: Course;
  mode?: 'create' | 'edit';
}

const CourseForm = ({ course, mode }: CourseFormProps) => {
  const { categories } = usePage().props as any
  const { data, setData, errors, put, post, processing } = useForm({
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || 0,
    discount_price: course?.discount_price || null,
    image_storage_id: course?.image_storage_id || '',
    preview_video_id: course?.preview_video_id || '',
    category_id: course?.category_id || '',
    slug: course?.slug || '',
    level: course?.level || LEVEL_BEGINNER,
    language: course?.language || 'English',
    duration_minutes: course?.duration_minutes || null,
    requirements: course?.requirements || '',
    target_audience: course?.target_audience || '',
    what_you_will_learn: course?.what_you_will_learn || '',
    tags: course?.tags || '',
    is_featured: course?.is_featured || false
  })

  const [activeTab, setActiveTab] = useState('basic')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'create') return post(route('teachers.courses.store'))
    put(route('teachers.courses.update', course?.id))
  }

  useEffect(() => {
    if (!data.title) return
    setData('slug', slugify(data.title, { lower: true }))
  }, [data.title])

  const levelOptions = [
    { value: LEVEL_BEGINNER, label: 'Beginner' },
    { value: LEVEL_INTERMEDIATE, label: 'Intermediate' },
    { value: LEVEL_ADVANCED, label: 'Advanced' },
    { value: LEVEL_ALL_LEVELS, label: 'All Levels' }
  ]

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Russian', label: 'Russian' }
  ]

  // Format category data for the SelectField
  const categoryOptions = categories?.map((category: any) => ({
    value: category.id,
    label: category.name
  })) || []

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative mb-6">
            <TabsList className="flex w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible">
              <TabsTrigger
                value="basic"
                className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 snap-start text-sm md:text-base"
              >
                <PenIcon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Basic Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 snap-start text-sm md:text-base"
              >
                <BookOpenIcon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Details</span>
              </TabsTrigger>
            </TabsList>
            <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-muted to-transparent md:hidden"></div>

            {/* Scroll indicator for mobile */}
            <div className="absolute right-0 bottom-1 text-xs text-muted-foreground italic md:hidden">
              <span className="mr-1">← Swipe →</span>
            </div>
          </div>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <TextInputField
                    label="Course Title"
                    name="title"
                    value={data.title}
                    placeholder="Enter a compelling course title"
                    error={errors.title}
                    onChange={(e) => setData('title', e.target.value)}
                  />

                  <TextInputField
                    label="Course Slug"
                    name="slug"
                    value={data.slug}
                    placeholder="your-course-url-slug"
                    error={errors.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                  />

                  <SelectField
                    label="Category"
                    name="category_id"
                    value={data.category_id}
                    options={categoryOptions}
                    placeholder="Select Category"
                    error={errors.category_id}
                    onChange={(value) => setData('category_id', value)}
                  />

                  <SelectField
                    label="Course Level"
                    name="level"
                    value={data.level}
                    options={levelOptions}
                    placeholder="Select Level"
                    error={errors.level}
                    onChange={(value) => setData('level', value)}
                  />

                  <SelectField
                    label="Language"
                    name="language"
                    value={data.language}
                    options={languageOptions}
                    placeholder="Select Language"
                    error={errors.language}
                    className="md:col-span-2"
                    onChange={(value) => setData('language', value)}
                  />

                  <NumberInputField
                    label="Course Duration (minutes)"
                    name="duration_minutes"
                    value={data.duration_minutes}
                    placeholder="Total duration in minutes"
                    error={errors.duration_minutes}
                    onChange={(e) => setData('duration_minutes', e.target.value === '' ? null : Number(e.target.value))}
                  />

                  <div className="md:col-span-2 mt-2">
                    <CheckboxField
                      id="is_featured"
                      label="Feature this course (will be highlighted in featured sections)"
                      checked={data.is_featured}
                      onChange={(checked) => setData('is_featured', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <RichEditorField
                  label="Course Description"
                  name="description"
                  value={data.description}
                  placeholder="Provide a detailed description of your course..."
                  error={errors.description}
                  onChange={(value) => setData('description', value)}
                />

                <TextareaField
                  label="What You Will Learn"
                  name="what_you_will_learn"
                  value={data.what_you_will_learn}
                  placeholder="List key learning outcomes (one per line)"
                  error={errors.what_you_will_learn}
                  className="mt-6"
                  helpText="Enter each learning outcome on a new line. These will be displayed as bullet points."
                  onChange={(e) => setData('what_you_will_learn', e.target.value)}
                />

                <TagInputField
                  label="Tags"
                  name="tags"
                  value={data.tags}
                  error={errors.tags}
                  className="mt-6"
                  onChange={(value) => setData('tags', value)}
                />

                <TextareaField
                  label="Course Requirements"
                  name="requirements"
                  value={data.requirements}
                  placeholder="List prerequisites or requirements for this course (one per line)"
                  error={errors.requirements}
                  helpText="Enter each requirement on a new line. These will be displayed as bullet points."
                  onChange={(e) => setData('requirements', e.target.value)}
                />

                <TextareaField
                  label="Target Audience"
                  name="target_audience"
                  value={data.target_audience}
                  placeholder="Describe who this course is for (one audience type per line)"
                  error={errors.target_audience}
                  className="mt-6"
                  helpText="Enter each audience type on a new line. These will be displayed as bullet points."
                  onChange={(e) => setData('target_audience', e.target.value)}
                />

                <TextInputField
                  label="Course Image ID"
                  name="image_storage_id"
                  value={data.image_storage_id}
                  placeholder="Image storage ID"
                  error={errors.image_storage_id}
                  helpText="This will be updated automatically when you upload an image"
                  onChange={(e) => setData('image_storage_id', e.target.value)}
                />

                <TextInputField
                  label="Preview Video ID"
                  name="preview_video_id"
                  value={data.preview_video_id || ''}
                  placeholder="Preview video storage ID"
                  error={errors.preview_video_id}
                  className="mt-6"
                  helpText="Upload a preview video to attract more students"
                  onChange={(e) => setData('preview_video_id', e.target.value)}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <NumberInputField
                    label="Regular Price ($)"
                    name="price"
                    value={data.price}
                    placeholder="e.g. 49.99"
                    step="0.01"
                    min={0}
                    max={999}
                    error={errors.price}
                    onChange={(e) => setData('price', Number(e.target.value))}
                  />

                  <NumberInputField
                    label="Discount Price ($)"
                    name="discount_price"
                    value={data.discount_price}
                    placeholder="e.g. 29.99 (leave empty for no discount)"
                    step="0.01"
                    min={0}
                    max={999}
                    error={errors.discount_price}
                    onChange={(e) => setData('discount_price', e.target.value === '' ? null : Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6">
          <div className="text-sm text-gray-500">
            {mode === 'edit' ? 'Edit your course information and click update when finished.' : 'Fill in the course details and click create to proceed.'}
          </div>
          <LoadingButton
            loading={processing}
            type="submit"
            className="px-8"
          >
            {mode === 'create' ? 'Create Course' : 'Update Course'}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default CourseForm;
