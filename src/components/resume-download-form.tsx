"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadIcon, Loader2Icon, XIcon } from "lucide-react";
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

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const resumeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.email("Enter a valid email address.").trim(),
  botcheck: z.string(),
});

const web3FormsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

const accessResponseSchema = z.object({
  success: z.boolean().optional(),
  error: z.string().optional(),
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
      botcheck: "",
    },
  });

  async function onSubmit(values: ResumeFormValues) {
    setIsSubmitting(true);
    let accessSent = false;

    try {
      const accessResponse = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const accessResult = accessResponseSchema.safeParse(
        await accessResponse.json(),
      );

      if (
        !accessResponse.ok ||
        !accessResult.success ||
        accessResult.data.success !== true
      ) {
        toast.error(
          accessResponse.status === 429
            ? "Too many requests. Please wait 15 minutes before trying again."
            : accessResult.success
              ? (accessResult.data.error ??
                "Could not send your access links. Please try again.")
              : "Could not send your access links. Please try again.",
        );
        return;
      }

      accessSent = true;
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error(
          "Your access links were sent, but the separate site notification could not be sent.",
        );
      }

      const body = new FormData();
      body.set("access_key", accessKey);
      body.set("name", values.name);
      body.set("email", values.email);
      body.set("botcheck", values.botcheck);

      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error("The separate site notification could not be sent.");
      }

      const result = web3FormsResponseSchema.parse(await response.json());
      if (!result.success) {
        throw new Error("The separate site notification could not be sent.");
      }

      setIsOpen(false);
      form.reset();
      toast.success(
        "Access links sent. Check your inbox or spam folder for the links; they expire in 24 hours.",
      );
    } catch (error: unknown) {
      console.error("Could not complete the resume access request.");
      toast.error(
        accessSent
          ? error instanceof Error
            ? error.message
            : "Your links were sent, but the separate site notification could not be sent."
          : "Could not send your access links. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <DownloadIcon />
          Request Access Links
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-2">
            <DialogTitle>Get my portfolio and resume</DialogTitle>
            <DialogDescription>
              Enter your name and email and we'll email you expiring access
              links.
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
            className="relative grid gap-4"
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
            <input
              {...form.register("botcheck")}
              type="text"
              name="botcheck"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute left-[-10000px] h-px w-px overflow-hidden"
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" aria-hidden="true" />
              ) : (
                <DownloadIcon aria-hidden="true" />
              )}
              {isSubmitting ? "Sending links..." : "Email me access links"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
