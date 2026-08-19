import Form from "next/form";

import { AiReadinessSubmit } from "@/components/pages/tools/ai-readiness/AiReadinessSubmit";
import { AI_READINESS_PATH } from "@/components/pages/tools/ai-readiness/seo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AiReadinessForm({
  defaultDomain,
}: {
  defaultDomain: string;
}) {
  return (
    <Form
      action={AI_READINESS_PATH}
      scroll={false}
      className="mt-10 max-w-md"
    >
      <Label htmlFor="domain" className="text-zinc-600">
        Domain
      </Label>
      <Input
        key={defaultDomain}
        id="domain"
        type="text"
        name="domain"
        placeholder="example.com"
        defaultValue={defaultDomain}
        className="mt-2 h-11 bg-white px-3"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        required
      />
      <AiReadinessSubmit />
    </Form>
  );
}
