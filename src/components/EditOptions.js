const EditOptions = ({ onEdit, selectAll }) => {

    const onSubmit = (e) => {
        e.preventDefault()
        onEdit()
    }

  return (
    <form id='deleteItems' className='edit-options' onSubmit={onSubmit}>
      <button 
        form='deleteItems'
        className='btn btn-delete' 
        type='submit'>Delete items(s)
      </button>
      <label htmlFor='selectAll'>Select All</label>
      <input 
          type='checkbox' 
          id='selectAll'
          name='select-all'
          onChange={(e) => selectAll(e.target.checked)}
      />
    </form>
  )
};

export default EditOptions;
