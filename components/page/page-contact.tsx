"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormValues } from "@/lib/types";
import { contactSchema } from "@/lib/validator";
import { createClient } from "@/lib/supabase/client";

import { Mails, ChevronRight, ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { faqs } from "@/lib/faq";

export default function PageContact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
    });
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: "",
    },
  });

  return (
    <div className="rounded-lg border border-dashed border-gray-200 py-6 px-4 sm:py-8 sm:px-6 lg:py-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* 왼쪽: FAQ */}
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="font-anyvid cursor-pointer rounded-lg border border-gray-200 px-4 py-4 hover:shadow-md transition-all duration-200 hover:border-brand/50"
            >
              <details className="group">
                <summary className="list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <div className="flex items-center gap-3">
                    <Badge className="text-xs shrink-0">{faq.category}</Badge>
                    <h3 className="text-sm text-muted-foreground sm:text-base transition-colors flex-1">
                      {faq.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-all shrink-0 group-open:hidden" />
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-all shrink-0 hidden group-open:block" />
                  </div>
                </summary>

                <div className="pt-4 mt-4 border-t text-muted-foreground">
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {faq.content}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* 오른쪽: 문의 폼 */}
        <div className="space-y-4 border border-gray-200 rounded-lg p-4">
          {!isLoggedIn && (
            <div className="flex items-center gap-2 rounded border border-brand/20 bg-brand/5 px-3 py-2.5">
              <AlertCircle
                className="h-4 w-4 shrink-0 text-brand"
                aria-hidden
              />
              <p className="text-sm text-gray-700 font-anyvid">
                로그인 후 작성할 수 있습니다.
              </p>
            </div>
          )}
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      메시지 <span className="star">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="문의 내용을 입력해주세요"
                        rows={10}
                        className="h-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full font-anyvid bg-brand text-white hover:bg-brand/90"
              >
                <Mails className="w-4 h-4" aria-hidden="true" />
                {form.formState.isSubmitting ? "전송 중..." : "문의하기"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
