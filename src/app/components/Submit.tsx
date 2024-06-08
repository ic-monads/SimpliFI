"use client";

import { useFormStatus } from "react-dom";

export default function Submit(props: {text: string}) {
  const status = useFormStatus();

  return(
    <button className={`btn ${status.pending ? "btn-disabled" : "btn-primary"}`} type="submit">{props.text}</button>
  )
}