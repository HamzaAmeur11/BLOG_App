import React from 'react'

const Comments = () => {
  return (
    <div className='mt-8'>
        <h2 className='text-2xl font-bold '>Comments</h2>
        <ul>
            <li className='mb-4 bg-slate-300 p-2'>
                <div className='flex items-center mb-2'>
                    <div className='mr-2 font-bold text-blue-500 '>AUTHOr</div>
                    <div className='text-gray-600'>- 2 days ago</div>
                </div>
                <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt deserunt vero quae minima accusamus qui, quis doloribus tenetur esse, aut iste? Doloribus officiis similique harum vitae repellat incidunt laborum inventore.</p>
            </li>
            <li></li>
        </ul>
    </div>
  )
}

export default Comments