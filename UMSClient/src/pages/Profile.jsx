import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Profile = () => {
  const { currentUser } = useSelector((s) => s.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagepercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formdata, setFormdata] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    console.log("image", image);
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageref = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageref, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setFormdata({
            ...formdata,
            profilePicture: downloadURL,
          });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.data.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm">
          {imageError?( 
            <span className=" text-red-700">Error Uploading Image(max size limit is 2Mb)</span>
          ):
          imagepercent>0 && imagepercent<=100 ?(
            <span className=" text-slate-700"> Uploading Image {imagepercent}%</span>

          ):(
            imagepercent===100 && !imageError? (<span className="text-green-700">Image Uploaded successfully</span>):""
          )
        }
        </p>
        <input
          defaultValue={currentUser.data.username}
          type="text"
          id="username"
          placeholder="User Name"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <input
          defaultValue={currentUser.data.email}
          type="email"
          id="email"
          placeholder="Email "
          className="bg-slate-100 rounded-lg p-3 "
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <button className="bg-[#17383c] text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-50">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-9">
        <span className="text-amber-900 ml-5">Delete Account</span>
        <span className="text-amber-900 mr-8">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
