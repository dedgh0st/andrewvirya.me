"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import PassCheckTab from "@/components/pass-check-tab";
import PassGenTab from "@/components/pass-gen-tab";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PasswordToolsShell() {
  return (
    <div className="flex min-h-svh flex-col bg-background font-mono text-foreground">
      <header className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-8 sm:py-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
          asChild
        >
          <Link href="/">
            <ArrowLeftIcon aria-hidden="true" />
            Home
          </Link>
        </Button>
        <div className="flex min-w-0 items-center gap-2">
          <p className="max-w-[48vw] truncate text-right text-[10px] text-muted-foreground sm:max-w-none sm:text-xs">
            andrewvirya.me / password-tools
          </p>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
        <Card className="w-full max-w-xl gap-0 border-border bg-card py-0 shadow-2xl shadow-black/10 ring-0 dark:shadow-black/30">
          <CardHeader className="px-5 pt-5 pb-0 sm:px-8 sm:pt-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-red-400">
              Password security suite
            </p>
            <CardTitle className="text-xl font-semibold">
              <h1 id="password-tools-title">Check or generate</h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 pt-6 pb-5 sm:px-8 sm:pb-8">
            <TooltipProvider delayDuration={300}>
              <Tabs defaultValue="check" className="w-full">
                <TabsList
                  variant="line"
                  aria-label="Password tools"
                  className="mb-6 grid h-auto w-full grid-cols-2 justify-stretch rounded-none border-b border-border p-0"
                >
                  <TabsTrigger
                    value="check"
                    className="h-auto justify-start rounded-none border-b-2 border-transparent px-3 py-3 text-left text-xs text-muted-foreground after:hidden hover:text-foreground data-[state=active]:border-red-500 data-[state=active]:text-foreground dark:data-[state=active]:border-red-500 dark:data-[state=active]:bg-transparent"
                  >
                    <span className="text-red-400">01</span>Pass Check
                  </TabsTrigger>
                  <TabsTrigger
                    value="generate"
                    className="h-auto justify-start rounded-none border-b-2 border-transparent px-3 py-3 text-left text-xs text-muted-foreground after:hidden hover:text-foreground data-[state=active]:border-red-500 data-[state=active]:text-foreground dark:data-[state=active]:border-red-500 dark:data-[state=active]:bg-transparent"
                  >
                    <span className="text-red-400">02</span>Pass Gen
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="check">
                  <PassCheckTab />
                </TabsContent>
                <TabsContent value="generate">
                  <PassGenTab />
                </TabsContent>
              </Tabs>
            </TooltipProvider>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border px-4 py-4 text-center text-[10px] text-muted-foreground">
        Local by design · Do not reuse compromised passwords
      </footer>
    </div>
  );
}
