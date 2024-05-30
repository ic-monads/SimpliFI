import React from 'react'

interface GenericButtonProps {
    text: string
}

function GenericButton({ text }: GenericButtonProps) {
  return (
    <button className='bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-400 transition-all'>
        {text}
    </button>
  )
}

export default GenericButton