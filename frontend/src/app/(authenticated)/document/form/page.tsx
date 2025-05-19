"use client";

import DocumentDraftForm from "@/components/document-draft-form";

export default function DocumentFom() {
  return (
    <main className="container py-10 mx-10 pr-20">
      <h1 className="text-3xl font-bold mb-6">문서 기안</h1>
      <DocumentDraftForm />
    </main>
  );
}
