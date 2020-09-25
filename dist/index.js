function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function createInputComponent(_ref) {
  var multiple = _ref.multiple,
      accept = _ref.accept;
  var el = document.createElement('input');
  el.type = 'file';
  el.accept = accept;
  el.multiple = multiple;
  return el;
}

var useFileUpload = function useFileUpload() {
  var _useState = React.useState(null),
      files = _useState[0],
      setFiles = _useState[1];

  var onChange = function onChange(e) {
    var parsedFiles = [];
    var target = e.target;

    for (var fileIndex in target.files) {
      if (isNaN(fileIndex)) {
        continue;
      }

      var file = target.files[fileIndex];
      var parsedFile = {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file: file
      };
      parsedFiles.push(parsedFile);
    }

    target.removeEventListener('change', onChange);
    target.remove();

    if (target.multiple) {
      return setFiles(parsedFiles);
    }

    return setFiles(parsedFiles[0]);
  };

  var uploadFile = function uploadFile(_temp) {
    var _ref2 = _temp === void 0 ? {
      accept: '',
      multiple: false
    } : _temp,
        accept = _ref2.accept,
        multiple = _ref2.multiple;

    var inputEL = createInputComponent({
      multiple: multiple,
      accept: accept
    });
    inputEL.addEventListener('change', onChange);
    inputEL.click();
  };

  return React__default.useMemo(function () {
    return [files, uploadFile];
  }, [files]);
};

exports.useFileUpload = useFileUpload;
//# sourceMappingURL=index.js.map
