import React from 'react'

const DeleteBtn = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submitted!')
  }

  return (
    <button 
        className='btn btn-delete' 
        type='submit'>Delete items(s)
    </button>
  )
}

export default DeleteBtn