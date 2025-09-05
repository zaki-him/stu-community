"use client"

import React, { useState, useActionState } from 'react'
import { Input } from './ui/input'
import MDEditor from '@uiw/react-md-editor'
import { formSchema } from '@/lib/validation'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [pitch, setPitch] = useState("")
  const router = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues)

      console.log(formValues)
      
      const result = await createPitch(prevState, formData, pitch)
      if (result.status == "SUCCESS") {
        router.push(`/startup/${result._id}`);
      }

      return result 
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors  = error.flatten().fieldErrors
        setErrors(fieldErrors as unknown as Record<string, string>)

        return {...prevState, error: "Validaton failed", status: "ERROR"}
      }
      
      return {...prevState, error: "Unexpected error has occurred", status: "ERROR"}
    }
  } 

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL"
  })

  return (
    <form action={formAction} className='startup-form'>
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input 
          id='title'
          name='title'
          className='startup-form-input'
          placeholder='Startup Title'
          required
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>


      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Input 
          id='description'
          name='description'
          className='startup-form-input'
          placeholder='Startup Description'
          required
        />
        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
      </div>


      <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input 
          id='category'
          name='category'
          className='startup-form-input'
          placeholder='Startup Category'
          required
        />
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
      </div>


      <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
        <Input 
          id='link'
          name='link'
          className='startup-form-input'
          placeholder='Startup Title'
          required
        />
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>


      <div data-color-mode="light">
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden'}}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>


    </form>
  )
}

export default StartupForm