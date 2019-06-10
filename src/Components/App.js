import React, { Component, createRef } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import LanguageSwitch from './languageSwitch';
import { FormattedMessage } from 'react-intl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.dropzoneRef = createRef();
  }

  uploadFile = acceptedFiles => {
    const formData = new FormData();
    acceptedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    axios
      .post('http://localhost/upload/upload.php', formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  openDialog = () => {
    if (this.dropzoneRef.current) {
      this.dropzoneRef.current.open();
    }
  };

  render() {
    return (
      <div>
        <Dropzone
          ref={this.dropzoneRef}
          onDrop={this.uploadFile}
          noClick
          noKeyboard
          multiple
        >
          {({ getRootProps, getInputProps, acceptedFiles }) => {
            return (
              <div className='container'>
                <h1>
                  <FormattedMessage id='app-title' />
                </h1>
                <div>
                  <FormattedMessage id='welcome-message' />
                </div>
                <div className='lang-switch'>
                  <LanguageSwitch />
                </div>
                <br />
                <div className='file-container'>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>
                      <FormattedMessage id='upload-file-title' />
                    </p>
                    <button type='button' onClick={this.openDialog}>
                      <FormattedMessage id='open-file' />
                    </button>
                  </div>
                  <aside>
                    <h4>
                      <FormattedMessage id='attached-files' />
                    </h4>
                    <ul>
                      {acceptedFiles.map(file => (
                        <li key={file.path}>{file.path}</li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}
