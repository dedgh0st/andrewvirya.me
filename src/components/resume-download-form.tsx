"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RESUME_URL =
  "https://docs.google.com/document/d/1jtaCuy1BtGAulHfWWZGrK1CmZZNyTcsM90C-WDt4v4o/export?format=pdf";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const resumeFormSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters."),
  email: z.email("Enter a valid email address."),
});

const web3FormsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export default function ResumeDownloadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: ResumeFormValues) {
    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.");
      }

      const body = new FormData();
      body.set("access_key", accessKey);
      body.set("name", values.name);
      body.set("email", values.email);

      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error(`Web3Forms returned status ${response.status}.`);
      }

      const result = web3FormsResponseSchema.parse(await response.json());
      if (!result.success) {
        throw new Error(result.message ?? "Web3Forms rejected the submission.");
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = RESUME_URL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setIsOpen(false);
      form.reset();
      toast.success(
        "Thanks, we received your details. Your resume is downloading.",
      );
    } catch (error: unknown) {
      console.error("Could not submit the resume download form.", error);
      toast.error("Failed to submit the form");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <DownloadIcon />
          Download Resume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-2">
            <DialogTitle>Download my resume</DialogTitle>
            <DialogDescription>
              Enter your name and email to continue to the resume PDF.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close dialog"
              className="-mr-2 -mt-2 shrink-0"
            >
              <XIcon />
            </Button>
          </DialogClose>
        </div>

        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Jane Doe"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <DownloadIcon aria-hidden="true" />
              {isSubmitting ? "Submitting..." : "Download Resume"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
