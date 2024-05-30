import React from 'react'

interface ButtonGroupProps {
    texts: string[]
}

function ButtonGroup({ texts }: ButtonGroupProps) {
  return (
    <div className='my-4 rounded'>
        {texts.map((text, index) => (
            <button
            key={index}
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2'
            >
            {text}
            </button>
        ))}
    </div>
  )
}

export default ButtonGroup