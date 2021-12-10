import { db, ref, state_changed, auth } from '../model/firebase';

export const getActualUser = async (id) =>{
    return await db.collection("Users").doc(id).get()
    // return await db.collection("Users").get();

}

export const updateUser = async (id, user, email) =>{
    updateEmail = auth.currentUser
    updateEmail.updateEmail(email).then().catch((err)=>console.log(err))
    return await db.collection("Users").doc(id).update(user)
}

export const uploadImage = async ( image , uploading ) =>{
    const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.onload = function(){
            resolve(xhr.response)
        }

        xhr.onerror = function(){
            reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", image, true)
        xhr.send(null)
    })

    ref.ref().child(new Date().toISOString())
    const snapshot = ref.put(blob)

    snapshot.on(state_changed,
         ()=>{ uploading = true},
          (err)=>{
            uploading = false
              console.log(err)
              blob.close()
              return
            },
           ()=>{snapshot.ref.getDownloadURL().then((url)=>{
               uploading = false   
               console.log(url)
               blob.close()
               return url

                }
            )
        }
    )
}
