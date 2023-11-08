import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const storage = getStorage()

const upload = async ({
  path,
  data,
  onProgress,
  onError,
  onComplete,
  metadata = {
    cacheControl: 'no-store'
  }
}) => {
  const sRef = ref(storage, path)
  const payload = await (await fetch(data)).blob()
  const task = uploadBytesResumable(sRef, payload, metadata)
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
