"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({issue}: {issue?: Issue}) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if(issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      }
      else {
        await axios.post("/api/issues", data);
      }
      
      router.push("/issues");
    } catch (error: any) {
      console.log(error);
      setError("An unexpected error occurred");
    }
    finally {
      setLoading(false);
    }
  })

  return (
    <div className="max-w-xl">
      {error && 
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      
      <form
        className="space-y-5"
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>

        <ErrorMessage> {errors.title?.message} </ErrorMessage> 

        
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage> {errors.description?.message} </ErrorMessage> 
        <Button disabled={loading}> {issue ? 'Update Issue' : 'Submit New Issue '} {loading && <Spinner />} </Button>
      </form>
    </div>
  );
};

export default IssueForm;
