import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type FormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  eyebrow?: string;
};

export const FormSection = ({
  title,
  description,
  children,
  eyebrow,
}: FormSectionProps) => {
  return (
    <Card className="gap-0 overflow-visible py-0">
      <CardHeader className="border-b px-5 py-4 sm:px-6">
        {eyebrow ? (
          <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
        {children}
      </CardContent>
    </Card>
  );
};
