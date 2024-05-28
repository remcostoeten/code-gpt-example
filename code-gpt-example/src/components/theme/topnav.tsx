import { CreateCategoryComponent } from "@/app/(storage)/_components/AddCategoryButton"
import { SimpleUploadButton } from "@/app/(storage)/_components/simple-upload-button"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <CreateCategoryComponent />
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
