"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function BlogTracingBeam({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TracingBeam className="px-6">
            {children}
        </TracingBeam>
    );
}
