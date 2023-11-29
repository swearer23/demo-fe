import { Input } from "@/components/ui/input"

export default function UploadFile ({
  onFileChange
}: {
  onFileChange: (file: File) => void
}) {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && onFileChange(e.target.files[0])
  }
  return (
    <>
      <Input id="picture" type="file" onChange={onChange}/>
    </>
  )
}