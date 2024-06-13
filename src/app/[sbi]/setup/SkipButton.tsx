"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SkipButton({ action }: { action: ((formData: FormData) => void) }) {
    const status = useFormStatus();
    return (
        <button className="btn" disabled={status.pending} formNoValidate={true} formAction={action} type="submit">Skip</button>
    );
}