"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function NextButton({ action, lastParcel }: { action: ((formData: FormData) => void), lastParcel: boolean }) {
    const status = useFormStatus();
    return (
        <button className="btn btn-primary" disabled={status.pending} formNoValidate={true} formAction={action} type="submit">
            { lastParcel ? "Finish" : "Next" }
        </button>
    );
}