import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from "../redux/user/userSlice";
import Modal from "../portalComponenets/modal.jsx";


const Profile = () => {
  const { currentUser, loading, error } = useSelector((s) => s.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagepercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formdata, setFormdata] = useState({
    username:currentUser.data.username,
    email:currentUser.data.email
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isupdated, setIsupdated] = useState(false);

  const [validationerror, setValidationerror] = useState({});

  const dispatch = useDispatch();
  console.log("current user", loading, error);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata({
            ...formdata,
            profilePicture: downloadURL,
          });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    console.log(formdata)
    if (!formdata.username) {
      errors.username = "Username is required.";
    }

    if (!formdata.email) {
      errors.email = "Email is required.";
    }
 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
      errors.email = "Email is invalid.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationerror(errors);
      return;
    }

    try {
      dispatch(updateStart());
      console.log(
        "axios post url is =====>> ",
        `/api/user/update/${currentUser.data._id}`
      );
      const result = await axios.post(
        `/api/user/update/${currentUser.data._id}`,
        formdata,
        {
          "Content-Type": "application/json",
        }
      );
      console.log("result", result);
      dispatch(updateSuccess(result));
      setIsupdated(true)


    } catch (err) {
      dispatch(updateFailure(err));
      setIsModalOpen(true);
    }
  };
  const handleDelete = async() => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return; // Exit if user cancels
  }
    console.log("delete button clicked")
    try {
      dispatch(deleteStart());
      const result=await axios.delete(`/api/user/delete/${currentUser.data._id}`)
      dispatch(deleteSuccess(result));

    } catch (err) {
      dispatch(deleteFailure(err));

    }
  };
  const handleSignout =async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return; // Exit if user cancels
  }
    console.log("signout button clicked")
    try {
    
      const result=await axios.get(`/api/auth/signout`)
      dispatch(signoutSuccess(result));
      

    } catch (err) {
   console.log(err)

    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={
            formdata.profilePicture
              ? formdata.profilePicture
              : currentUser.data.profilePicture
          }
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm">
          {imageError ? (
            <span className=" text-red-700">
              Error Uploading Image(max size limit is 2Mb)
            </span>
          ) : imagepercent > 0 && imagepercent < 100 ? (
            <span className=" text-slate-700">
              {" "}
              Uploading Image {imagepercent}%
            </span>
          ) : imagepercent === 100 && !imageError ? (
            <span className="text-green-700">Image Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.data.username}
          type="text"
          id="username"
          placeholder="User Name"
          className="bg-slate-100 rounded-lg p-3 "
          onChange={handleChange}
        />
        {validationerror.username && (
          <p className="text-red-500 text-sm">{validationerror.username}</p>
        )}
        <input
          defaultValue={currentUser.data.email}
          type="email"
          id="email"
          placeholder="Email "
          className="bg-slate-100 rounded-lg p-3 "
          onChange={handleChange}
        />
        {validationerror.email && (
          <p className="text-red-500 text-sm">{validationerror.email}</p>
        )}

        <button className="bg-[#17383c] text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-50">
          Update
        </button>
      </form>
      {isupdated && <p className="text-green-700 text-center mt-10 text-sm">Profile Updated successfully</p>}
      <div className="flex justify-between mt-9">
        <span onClick={handleDelete} className="text-amber-900 ml-5 cursor-pointer hover:opacity-60">
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-amber-900 mr-8 cursor-pointer hover:opacity-60">
          Sign out
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        message={error?.response?.data?.message || "Invalid Credential"}
      />
    </div>
  );
};

export default Profile;
