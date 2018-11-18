import React from 'react';
import Dropzone from '../../../components/uielements/dropzone.js';
import { notification } from '../../../components';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import DropzoneWrapper from './dropzone.style';
import Card from '../../../containers/Uielements/Card/card.style';

export default function(props) {
  const componentConfig = {
    iconFiletypes: ['.pdf', '.docx', '.png', '.jpg'],
    method: true,
    showFiletypeIcon: true,
    uploadMultiple: false,
    maxFilesize: 15, // MB
    maxFiles: 1,
    dictMaxFilesExceeded: 'You can only upload upto 3 files',
    dictRemoveFile: 'Delete',
    dictCancelUploadConfirmation: 'Are you sure to cancel upload?',
    postUrl: 'no-url',
  };
  const djsConfig = { autoProcessQueue: false };
  const eventHandlers = {
    addedfile: file => {
    	const { callback } = props;
	    callback(file);
    	notification('success', `${file.name} added`)
    },
    success: file => {
	    notification('success', `${file.name} successfully uploaded`);
    },
    error: error => notification('error', 'transfer failed'),
  };

  return (
      <div style={{marginTop: 0, marginBottom: 0}}>

		  <Card>
				  <DropzoneWrapper>
					  <Dropzone
						  config={componentConfig}
						  eventHandlers={eventHandlers}
						  djsConfig={djsConfig}
					  />
				  </DropzoneWrapper>
		  </Card>

      </div>
  );
}

/*

var f = new File([""], "filename.txt", {type: "text/plain", lastModified: date})
var storageRef = Firebase.storage().ref();
var mountainImagesRef = storageRef.child('images/');
var file = ... // use the Blob or File API
ref.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});


var uploadTask = storageRef.child('images/rivers.jpg').put(file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;
});



let user = firebase.auth().currentUser;
	    const ref = firebase.storage.ref();
	    const task = ref.child(`profile/${user.uid}`).put(file);
	    task.then((snapshot) => {
		    const photoURL = snapshot.downloadURL;
		    user.updateProfile({
			    photoURL
		    }).then(function() {
			    callback(photoURL);
		    }).catch(function(error) {
			    // An error happened.
		    });
	    }).catch((error) => {
		    console.error(error);
	    })

 */
