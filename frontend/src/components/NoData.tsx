import React from 'react'

const NoData: React.FC = React.memo(() => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "calc(100vh - 84px)" }}
    >
      <h3 className="text-center">No data found</h3>
    </div>
  )
})

export default NoData
