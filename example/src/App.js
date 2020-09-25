import React from 'react'

import { useFileUpload } from 'use-file-upload'

const App = () => {
  const [files, selectFiles] = useFileUpload()
  console.log(files)
  return (
    <>
      <button
        onClick={() => {
          selectFiles({ multiple: true })
          console.log(files)
        }}
      >
        Click to Upload
      </button>
      {files && `${JSON.stringify(files)} Uploaded`}
    </>
  )
}

export default App
