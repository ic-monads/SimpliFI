"use client";

export default function ShowModalButton({ fileUrl }: { fileUrl: string }) {
    const clickAction = () => {
        document.getElementById("evidence-modal-content")!.setAttribute("data", fileUrl);
        (document.getElementById("evidence-modal")! as HTMLFormElement).showModal();
    }

    return (
        <button className="btn btn-sm" onClick={clickAction}>View File</button>
    )
}