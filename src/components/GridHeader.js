const GridHeader = () => {
    return (
      <div className='grid-header'>
          <div><h3>Item code</h3></div>
          <div><h3>Item name</h3></div>
          <div><h3>Department</h3></div>
          <div className='grid-div-2'><h3>Price/unit</h3></div>
          <div className='grid-div-2'><h3 className='qty'>Qty.</h3></div>
      </div>
    )
  };
  
  export default GridHeader;