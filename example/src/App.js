import React from 'react'
import './index.css'
import { useFileUpload } from 'use-file-upload'
const App = () => {
  const defaultSrc =
    'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png'

  const [files, selectFiles] = useFileUpload()

  return (
    <div id='app'>
      <img src={files?.source || defaultSrc} alt='preview' />
      <button
        onClick={() =>
          selectFiles({ accept: 'image/*' }, ({ name, size, source, file }) => {
            console.log('Files Selected', { name, size, source, file })
          })
        }
      >
        Upload Avatar
      </button>
    </div>
  )
}
export default App
