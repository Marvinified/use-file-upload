import React, { useState } from 'react';

function createInputComponent({
  multiple,
  accept
}) {
  const el = document.createElement('input');
  el.type = 'file';
  el.accept = accept;
  el.multiple = multiple;
  return el;
}

const useFileUpload = () => {
  const [files, setFiles] = useState(null);

  let userCallback = () => {};

  const onChange = async e => {
    const parsedFiles = [];
    const target = e.target;

    for (const fileIndex in target.files) {
      if (isNaN(fileIndex)) {
        continue;
      }

      const file = target.files[fileIndex];
      const parsedFile = {
        source: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file
      };
      parsedFiles.push(parsedFile);
    }

    target.removeEventListener('change', onChange);
    target.remove();

    if (target.multiple) {
      setFiles(parsedFiles);
      return userCallback(parsedFiles);
    }

    setFiles(parsedFiles[0]);
    return userCallback(parsedFiles[0]);
  };

  const uploadFile = ({
    accept,
    multiple
  } = {
    accept: '',
    multiple: false
  }, cb) => {
    if (typeof cb === 'function') {
      userCallback = cb;
    }

    const inputEL = createInputComponent({
      multiple,
      accept
    });
    inputEL.addEventListener('change', onChange);
    inputEL.click();
  };

  return React.useMemo(() => [files, uploadFile], [files]);
};

export { useFileUpload };
//# sourceMappingURL=index.modern.js.map
