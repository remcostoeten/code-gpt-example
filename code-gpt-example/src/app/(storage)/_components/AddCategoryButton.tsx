"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LoadingSpinnerSVG } from "./simple-upload-button"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { User, auth, clerkClient } from "@clerk/nextjs/server"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useUploadThing } from "@/core/lib/uploadting"
import { db } from "@/core/db"

type Input = Parameters<typeof useUploadThing>

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedFiles = Array.from(e.target.files)
    const result = await $ut.startUpload(selectedFiles)

    console.log("uploaded files", result)
    // TODO: persist result in state maybe?
  }

  return {
    inputProps: {
      onChange,
      multiple: true,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  }
}

export function CreateCategoryComponent() {
  const router = useRouter()
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast(
        <div className="flex items-center gap-2 text-white">
          <LoadingSpinnerSVG />{" "}
          <span className="text-lg">creating category...</span>
        </div>,
        {
          duration: 100000,
          id: "upload-begin",
        },
      )
    },
    onUploadError(error) {
      toast.dismiss("upload-begin")
      toast.error("Upload failed")
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin")
      toast("Upload complete!")
    },
  })

  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const createCategory = async (name: string) => {
    if (!user || user.privateMetadata?.["can-upload"] !== true)
      throw new Error("User Does Not Have Upload Permissions")

    await db.insert(imageFolders).values({
      name: name,
      userId: user.id,
    })
  }

  if (isLoading) {
    toast("loading...")
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Create Category</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Input
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Textarea
          placeholder="Category Description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <label htmlFor="upload-button" className="cursor-pointer">
          upload
        </label>
        <input
          id="upload-button"
          type="file"
          className="sr-only"
          {...inputProps}
        />
        <Button onClick={() => createCategory(categoryName)}>Submit</Button>
      </PopoverContent>
    </Popover>
  )
}
