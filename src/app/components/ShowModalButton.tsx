"use client";

export default function ShowModalButton({ modalId }: { modalId: string }) {
    const clickAction = () => {
        (document.getElementById(`${modalId}-modal`)! as HTMLFormElement).showModal();
    }

    return (
        <button className="btn btn-sm" onClick={clickAction}>View File</button>
    )
}