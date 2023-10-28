import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const storage = getStorage()

const upload = ({
  path,
  data,
  onProgress,
  onError,
  onComplete,
  metadata = {
    cacheControl: 'no-store'
  }
}) => {
  console.log('xxxxxxxxxxxxxx')
  console.log(data)
  console.log('xxxxxxxxxxxxxx')

  const sRef = ref(storage, path)
  const task = uploadBytesResumable(sRef, data, metadata)
  task.on(
    'state_changed',
    (snapshot) => {
      onProgress({
        transferred: snapshot.bytesTransferred,
        total: snapshot.totalBytes
      })
    },
    (error) => {
      onError(error)
    },
    () => {
      getDownloadURL(task.snapshot.ref).then((downloadURL) => {
        onComplete(downloadURL)
      })
    }
  )
}

export { upload }
