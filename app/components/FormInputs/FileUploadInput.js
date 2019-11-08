/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-console */
import React, { useMemo, useEffect, useState } from 'react';
import { Field, setFieldValue } from 'formik';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import DefaultImgIcon from 'images/default-img.png';
import DeleteIcon from 'images/delete2-wht-icon.png';
import DeleteIconBlue from 'images/delete-icon.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import evergentTheme from '../../themes/evergentTheme/evergentTheme.json';

const styles = (theme) => ({
  baseStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    color: theme.primary,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  },
  ptag: {
    lineHeight: '20px',
    margin: '0',
    textAlign: 'center',
    color: theme.primary,
  },
  smallText: {
    lineHeight: '20px',
    margin: '0',
    textAlign: 'center',
    fontSize: '9pt',
    opacity: '0.75',
    paddingTop: '22px',
    color: theme.primary,
  },
});

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: evergentTheme.palette.primary.main,
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
  // maxWidth: '420px',
  // minWidth: '420px'
};

const baseStyleForText = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: evergentTheme.palette.primary.main,
  outline: 'none',
  transition: 'border .24s ease-in-out',
  maxWidth: '420px',
  maxHeight: '60px'
};
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  marginBottom: 8,
  marginRight: 20,
  width: 130,
  padding: 0,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  alignItems: 'center',
};

const img = {
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'cover'
};

const customStyles = {
  // ptag: {
  //   lineHeight: '20px',
  //   margin: '0',
  //   textAlign: 'center'
  // },
  // smallText: {
  //   lineHeight: '20px',
  //   margin: '0',
  //   textAlign: 'center',
  //   fontSize: '9pt',
  //   opacity: '0.75',
  //   paddingTop: '22px'
  // },
  imageDiv: {
    textAlign: 'center',
  },
  textDiv: {
    paddingLeft: '15px',
    wordBreak: 'break-all'
  },
  deleteDiv: {
    textAlign: 'center',
    height: '66px',
    width: '68px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  delete: {
    background: evergentTheme.palette.primary.main,
    padding: '8px'
  }
};
const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
const errorText = {
  position: 'inherit'
};
const uploadButtonStyle = {
  marginBottom: '5px'
};
const renderFileUploadInput = ({
  field,
  form: {
    setFieldValue
  },
  ...props
}) => {
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState([]);
  const [isThumbnailShowing, setIsThumbnailShowing] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  let uploadURL = '/uploadPublic';
  if (props.storageType === 'private') {
    uploadURL = '/uploadPrivate';
  }
  // eslint-disable-next-line func-names
  const onChange = function (file) {
    setUploadError(false);
    setSelectedFileName(file[0].name);
    // if (props.simpleUI !== 'yes') { setIsThumbnailShowing(true); }
    const data = new FormData();
    data.append('inputFile', file[0]);
    const xhr = new XMLHttpRequest();
    setIsUploadInProgress(true);
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        setIsUploadInProgress(false);
        try {
          const resData = JSON.parse(this.responseText);
          if (resData && resData.files && resData.files.length > 0 && resData.files[0].location) {
            setIsThumbnailShowing(true);
            const fileURL = resData.files[0].location;
            setFieldValue(field.name, fileURL);
            setUploadError(false);
          } else {
            setUploadError(true);
            setFieldValue(field.name, '');
          }
        } catch (e) {
          setUploadError(true);
          setFieldValue(field.name, '');
        }
      }
    });
    xhr.open('POST', uploadURL);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  };
  const dropzoneOptions = {};
  dropzoneOptions.onDropAccepted = onChange;
  dropzoneOptions.multiple = false;
  if (props && props.fileType && props.fileType === 'image') {
    dropzoneOptions.accept = '.png,.jpg,.jpeg';
    dropzoneOptions.onDrop = (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    };
  }
  if (props && (props.fileURL || props.fileName)) {
    if (props.fileURL && props.fileURL !== 'null') {
      if (files.length === 0) {
        setFiles([{
          preview: props.fileURL,
          name: props.fileURL
        }]);
        setIsThumbnailShowing(true);
        setSelectedFileName(props.fileURL);
      }
    }
  }
  if (props && props.fileExtenstion) {
    dropzoneOptions.accept = props.fileExtenstion;
  }
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="Uploaded File Thumbnail"
        />
      </div>
    </div>
  ));
  const deleteFile = function () {
    setIsThumbnailShowing(false);
    setFieldValue(field.name, '');
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone(dropzoneOptions);
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);
  const { classes } = props;
  return (
    <div>
      {!isUploadInProgress ?
        <div>
          {!isThumbnailShowing ?
            <div>{(props.simpleUI === 'yes') ?
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant="contained" style={uploadButtonStyle} color="secondary" type="submit" className="btn large">{props.label}</Button>

              </div>
              :
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Grid container direction="row" justify="center" alignItems="center" >
                  <Grid item xs={8}>
                    <p
                      className={classes.ptag}
                      // style={customStyles.ptag}
                    >{props.label ? props.label : 'Drag your logo here or Click to upload it'}
                    </p>
                    <p className={classes.smallText}>{props.dimenstionsLabel ? props.dimenstionsLabel : 'Best dimensions 400 x 400 (w x h)'}</p>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3} style={customStyles.imageDiv} >
                    <img src={DefaultImgIcon} alt="default icon" width="64" />
                  </Grid>
                </Grid>
              </div>
            }
            </div>
            :
            <div >
              {(props.fileType === 'image') ?
                <div style={thumbsContainer}>
                  {thumbs}
                  <div onClick={deleteFile} style={customStyles.deleteDiv} >
                    <img src={DeleteIcon} alt="default icon" style={customStyles.delete} />
                  </div>
                </div>
                :
                <div>
                  <div style={baseStyleForText}>
                    <Grid container direction="row" justify="center" alignItems="center" >
                      <Grid item xs={7}>
                        <div style={customStyles.textDiv} >{selectedFileName}</div>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={3} style={customStyles.imageDiv} >
                        <div onClick={deleteFile}>
                          <img src={DeleteIconBlue} alt="default icon" height="24" />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>}
            </div>}
          {uploadError ? <span className="required" style={errorText} >Unable to upload image.Please try again.</span> : ''}
        </div>
        : <Grid container direction="row" justify="center" alignItems="center" ><CircularProgress /></Grid>}
    </div>
  );
};

const FileUploadInput = (props) => (
  <React.Fragment>
    <Field
      name={props.fieldName}
      component={renderFileUploadInput}
      label={props.fieldLabel}
      dimenstionsLabel={props.fieldDimenstionsLabel}
      id={props.fieldID}
      fileType={props.fieldFileType}
      fileURL={props.fieldFileURL}
      fileName={props.fieldFileName}
      simpleUI={props.fieldSimpleUI}
      fileExtenstion={props.fieldFileExtention}
      storageType={props.fieldStorageType}
      classes={props.classes}

    />
  </React.Fragment>
);
FileUploadInput.propTypes = {
  fieldName: PropTypes.string,
  fieldId: PropTypes.string,
  // fieldFileType can be image or any
  fieldFileType: PropTypes.string.isRequired,
  // how to store file public/private
  fieldStorageType: PropTypes.string.isRequired,
  fieldFileURL: PropTypes.string,
  fieldFileName: PropTypes.string,
  // fieldSimpleUI is for passing  yes or no option
  fieldSimpleUI: PropTypes.string.isRequired,
  // fieldFileExtention is for passing  file extension it will accept , separated file extentions ex:.p12,.pdf,.doc
  fieldFileExtention: PropTypes.string,
  // fieldFileSize is for passing file size.File size should in MBs ex:1MB,10MB,50MB
  fieldFileSize: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldDimenstionsLabel: PropTypes.string
};

FileUploadInput.defaultProps = {
  fieldName: '',
  fieldId: '',
  fieldFileURL: '',
  fieldFileName: '',
  fieldLabel: ' ',
  fieldDimenstionsLabel: ''
};

// export default FileUploadInput;
export default withStyles(styles)(FileUploadInput);
