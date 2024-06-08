"use client";

export default function ShowModalButton({ evidenceId }: { evidenceId: string }) {
    const clickAction = () => {
        (document.getElementById(`${evidenceId}-modal`)! as HTMLFormElement).showModal();
    }

    return (
        <button className="btn btn-sm" onClick={clickAction}>View File</button>
    )
}