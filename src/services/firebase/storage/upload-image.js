const uploadImage = (fileToUpload) => {
  const fileRef = fileToUpload.ref.put(fileToUpload.file)

  return new Promise((resolve, reject) => {
    fileRef
      .on('state_changed', snapshot => {
        console.log(snapshot)
      }, err => {
        reject(err)
      }, () => {
        fileRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve(downloadURL)
        })
      })
  })
}

export default uploadImage
