import React from 'react'

interface Props {
  message: string
}

const Error: React.FC<Props> = React.memo((props) => {
  const { message } = props;
  return (
    <div className="d-flex justify-content-center align-items-center alert alert-danger" role="alert" style={{ height: "calc(100vh - 84px)" }}>
      <h3 className="text-center"> {message}</h3>
    </div>
  )
})

export default Error