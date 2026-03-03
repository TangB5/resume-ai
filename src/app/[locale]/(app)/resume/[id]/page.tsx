export default function ResumeEditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Resume Editor</h1>
      <p className="text-neutral-400 mt-2">Editing resume: {params.id}</p>
    </div>
  )
}
