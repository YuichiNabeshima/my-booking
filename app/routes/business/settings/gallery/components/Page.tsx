import { useState } from "react"
import type React from "react"
import {  X, Plus, Save, Trash2, Edit, Check, ImageIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardContent } from "~/components/ui/card"
import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { Form, useLoaderData } from "react-router"
import { schema } from "../schemas/schema"
import type { loader } from "../route"
import type { GalleryImageFieldData } from "../types/GalleryImage"

export function Page() {
  // State for managing images and UI
  const data = useLoaderData<typeof loader>();

  const [editingImageId, setEditingImageId] = useState<number | null>(null)

  // Setup form with conform
  const [form, fields] = useForm<{ images: Partial<GalleryImageFieldData>[]}>({
    id: "images-form",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
    defaultValue: {
      images: data?.images,
    },
    shouldRevalidate: "onBlur",
  });

  function handleImageInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        form.update({ name: fields.images.getFieldList()[index].getFieldset().url.name, value: reader.result as string });
      }
      reader.readAsDataURL(file)
    }
  } 

  // Remove an image
  const removeImage = (id: number) => {
    form.remove({ name: fields.images.name, index:  id})
  }

  // Start editing a caption
  const startEditingCaption = (id: number) => {
    setEditingImageId(id)
  }

  // Save edited caption
  const saveEditedCaption = (name: string) => {
    if (editingImageId !== null) {
      const captionInput = document.querySelector(`[name="${name}"]`) as HTMLTextAreaElement
      form.update({ name: fields.images.getFieldList()[editingImageId].getFieldset().caption.name, value: captionInput.value })
      setEditingImageId(null)
    }
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingImageId(null)
  }

  const fieldsList = fields.images.getFieldList();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <Form method="post" encType="multipart/form-data" {...getFormProps(form)}>
          <input type="hidden" name="images[-1].id" defaultValue={''} />
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h2 className="text-lg font-semibold mb-6">Store Image Management</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Uploaded Images</h3>
                <p className="text-sm text-gray-500">{fieldsList.length} images</p>
              </div>
              <p className="text-sm text-gray-500">
                You can upload multiple images for your store. Each image can have its own caption.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fieldsList.map((field, index) => {
                  const { key: idKey, ...imageId } = getInputProps(field.getFieldset().id, { type: 'hidden' });
                  const { key: urlKey, ...imageUrl } = getInputProps(field.getFieldset().url, { type: 'hidden' });
                  const { key: captionKey, ...caption } = getTextareaProps(field.getFieldset().caption);
                  const { key: fileKey, ...imageFile } = getInputProps(field.getFieldset().file, { type: 'file' });

                  return (
                  <Card key={index} className="overflow-hidden py-0 gap-0">
                    <div className="relative h-48 w-full">
                      <label
                        htmlFor={imageFile.id}
                        className="absolute top-2 right-2 bg-white bg-opacity-90 text-primary hover:bg-primary hover:text-white transition-colors p-2 rounded-full cursor-pointer shadow-md"
                        title="Replace image"
                        >
                          <ImageIcon size={20} />
                        </label>
                      <input
                        {...imageFile}
                        onChange={e => handleImageInputChange(e, index)}
                        className="hidden"
                      />
                      <img
                        src={imageUrl.defaultValue || "/img/common/no_image_01.png"}
                        alt={caption.defaultValue}
                        className="object-cover w-full h-full"
                      />
                      {field.getFieldset().file.errors && (
                        <p className="absolute bottom-0 left-0 w-full bg-red-500 text-white text-sm p-2">
                          {field.getFieldset().file.errors}
                        </p>
                      )}
                    </div>
                    <CardContent className="p-4">
                      {editingImageId === index ? (
                        <div className="space-y-2">
                          <Textarea
                            defaultValue={caption.defaultValue}
                            className="w-full text-sm"
                            rows={3}
                            placeholder="Enter image caption"
                            {...caption}
                          />
                          <input {...imageId} />
                          <div className="flex gap-2">
                            <Button type="button" size="sm" onClick={() => saveEditedCaption(caption.name)} className="flex-1 cursor-pointer">
                              <Check size={16} className="mr-1" />
                              Save
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                              className="flex-1 cursor-pointer"
                            >
                              <X size={16} className="mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-700 flex-1 line-clamp-2">{caption.defaultValue}</p>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditingCaption(index)}
                              className="ml-2 h-8 w-8 p-0 cursor-pointer"
                            >
                              <Edit size={16} />
                              <span className="sr-only">Edit caption</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="w-full cursor-pointer"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </Button>
                        </div>
                      )}

                      {/* Hidden inputs to store the data for non-editing state */}
                      {editingImageId !== index && (
                        <>
                          <input type="hidden" name={`images[${index}].id`} value={imageId.defaultValue} />
                          <input type="hidden" name={`images[${index}].caption`} value={caption.defaultValue} />
                        </>
                      )}
                    </CardContent>
                  </Card>
                )})}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button className="px-8 w-full" {...form.insert.getButtonProps({ name: fields.images.name, defaultValue: { id: '', url: '', caption: '', file: '' } })}>
                <Plus size={16} className="mr-2 cursor-pointer" />
                Add
              </Button>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" className="px-8 w-full cursor-pointer">
                <Save size={16} className="mr-2" />
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

