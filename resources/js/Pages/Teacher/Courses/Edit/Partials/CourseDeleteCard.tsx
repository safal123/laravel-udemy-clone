import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { AlertTriangle, Trash2, Info } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/Components/ui/dialog'

export const CourseDeleteCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = () => {
    setIsDeleting(true)

    // Handle actual deletion logic here
    console.log('Course deleted')

    // Simulate API call with timeout
    setTimeout(() => {
      setIsDeleting(false)
      setIsDialogOpen(false)
      setConfirmText('')
    }, 1000)
  }

  return (
    <>
      <Card className="mt-6 border border-red-200 shadow-sm hover:shadow-md transition-all duration-200 w-full mx-auto p-2 bg-red-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold">Delete Course</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-600 pb-2">
            Once deleted, all course content, student enrollments, and related data will be permanently removed and cannot be recovered.
          </p>
          <Button
            variant="destructive"
            size="default"
            onClick={() => setIsDialogOpen(true)}
            className="group flex items-center gap-2 hover:bg-red-600 transition-colors px-6 py-2.5"
          >
            <Trash2 className="h-5 w-5 group-hover:animate-pulse" />
            Delete Course
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Course Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              This action is irreversible and will permanently delete this course.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 my-3">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Please note that deleting this course will:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Remove all course content and materials</li>
                  <li>Delete all student enrollment records</li>
                  <li>Remove all student progress data</li>
                  <li>Delete all reviews and ratings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="confirm" className="text-sm font-medium text-gray-700 block mb-1">
              Type "DELETE" to confirm
            </label>
            <input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="DELETE"
            />
          </div>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDialogOpen(false)
                setConfirmText('')
              }}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={confirmText !== 'DELETE' || isDeleting}
              className={`${isDeleting ? 'opacity-80' : 'hover:bg-red-600'} transition-colors`}
            >
              {isDeleting ? 'Deleting...' : 'Delete Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
