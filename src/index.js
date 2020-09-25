import React, { useState } from 'react'
// import styles from './styles.module.css'

function createInputComponent({ multiple, accept }) {
  const el = document.createElement('input')
  // set input config
  el.type = 'file'
  el.accept = accept
  el.multiple = multiple
  // return file input element
  return el
}

export const useFileUpload = () => {
  const [files, setFiles] = useState(null)

  // Handle onChange event
  const onChange = (e) => {
    const parsedFiles = []
    const target = e.target

    // Loop through files
    for (const fileIndex in target.files) {
      // check if index is a number
      if (isNaN(fileIndex)) {
        continue
      }

      // get file object
      const file = target.files[fileIndex]

      // select properties

      const parsedFile = {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file // original file object
      }

      // add to parsed file list
      parsedFiles.push(parsedFile)
    }

    // remove event listener after operation
    target.removeEventListener('change', onChange)

    // remove input element after operation
    target.remove()

    // update files state hook
    if (target.multiple) {
      return setFiles(parsedFiles)
    }
    return setFiles(parsedFiles[0])
  }

  // Handle upload
  const uploadFile = (
    { accept, multiple } = { accept: '', multiple: false }
  ) => {
    // create virtual input element
    const inputEL = createInputComponent({ multiple, accept })
    // add event listener
    inputEL.addEventListener('change', onChange)
    inputEL.click()
  }

  return React.useMemo(() => [files, uploadFile], [files])
}
