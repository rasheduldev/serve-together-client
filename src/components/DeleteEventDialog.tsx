
"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getTokenFromClient } from "@/lib/getTokenFromClient"

export function DeleteEventDialog({
  id,
  title,
  onDeleted,
}: {
  id: string
  title: string
  onDeleted: (id: string) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")
    const token = await getTokenFromClient()
    try {
      const res = await fetch(
        `http://localhost:8000/delete-event/${id}`,
        {
          method: "DELETE",
          headers:{
            authorization: `Bearer ${token}`
          }
        }
        
      )

      if (!res.ok) {
        throw new Error("Failed to delete event")
      }

      const data = await res.json()

      if (data.deletedCount > 0) {
        onDeleted(id)
      } else {
        setError("Event not found. Please try again.")
      }
    } catch (error) {
      console.log(error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg text-muted-foreground hover:text-destructive"
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this event?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete “{title}”?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
