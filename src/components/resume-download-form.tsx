"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
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

const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const resumeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.email("Enter a valid email address.").trim(),
  botcheck: z.string(),
  hCaptchaToken: z.string().min(1, "Please complete the hCaptcha challenge."),
});

const accessResponseSchema = z.object({
  success: z.boolean().optional(),
  error: z.string().optional(),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export default function ResumeDownloadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      botcheck: "",
      hCaptchaToken: "",
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
        form.setValue("hCaptchaToken", "", { shouldValidate: true });
        setCaptchaVersion((version) => version + 1);
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
      setIsOpen(false);
      form.reset();
      setCaptchaVersion((version) => version + 1);
      toast.success(
        "Access links sent. Check your inbox or spam folder for the links; they expire in 24 hours.",
      );
    } catch (error: unknown) {
      console.error("Could not complete the resume access request.");
      toast.error(
        accessSent
          ? error instanceof Error
            ? error.message
            : "Your links were sent, but the request could not be completed."
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
          Access My Resume
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
            <FormField
              control={form.control}
              name="hCaptchaToken"
              render={() => (
                <FormItem>
                  <FormLabel>Verify that you're human</FormLabel>
                  <HCaptcha
                    key={captchaVersion}
                    sitekey={HCAPTCHA_SITE_KEY}
                    reCaptchaCompat={false}
                    onVerify={(token) =>
                      form.setValue("hCaptchaToken", token, {
                        shouldValidate: true,
                      })
                    }
                    onExpire={() =>
                      form.setValue("hCaptchaToken", "", {
                        shouldValidate: true,
                      })
                    }
                    onError={() => {
                      form.setValue("hCaptchaToken", "", {
                        shouldValidate: true,
                      });
                      toast.error(
                        "hCaptcha could not load. Please refresh and try again.",
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
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
