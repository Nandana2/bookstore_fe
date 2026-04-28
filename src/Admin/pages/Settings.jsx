import React,{useState,useEffect} from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../Components/Footer";
import { FaPen } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { getAdminProfileApi,updateAdminProfileApi } from "../../services/allApis";
import { toast } from "react-toastify";
import { useContext } from "react";
import { adminContext } from "../../ContextApi/ContextApi";
import base_url from "../../services/base_url";

function Settings() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    profilePic: "",
    bio: "",
  });
  const [preview, setPreview] = useState("");
  const { adminProfileStatus, setAdminProfileStatus } =
    useContext(adminContext);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAdminProfileData();
      
    }
  }, []);
  

  const getAdminProfileData = async () => {
    const response = await getAdminProfileApi();
    if (response.status === 200) {
      console.log(response?.data);
      const admin = response?.data;
      console.log(admin);
      setProfileData({
        username: admin?.username,
        email: admin?.email,
        password: admin?.password,
        confirmPassword: admin?.password,
        role: admin?.role,
        profilePic: admin?.profile,
        bio: admin?.bio,
      });
    } else {
      console.log("Error fetching profile data");
    }
  };
  // console.log()

  // profile image upload
  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];
    const previewUrl = URL.createObjectURL(imgFile);
    setPreview(previewUrl);
    setProfileData({ ...profileData, profile: imgFile });
  };

  // profile edit submit handler
  const handleProfileEdit = async (e) => {
    // console.log(profileData)
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      profileLogo,
      bio,
    } = profileData;
    if (!username || !email || !password || !confirmPassword || !role) {
      toast.warning("Enter Valid Details");
    } else {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password should be same");
        console.log(password, confirmPassword);
      } else {
        const formData = new FormData();
        if (preview) {
          for (let key in profileData) {
            formData.append(key, profileData[key]);
          }
          const response = await updateAdminProfileApi(formData);
          console.log(response);
          if (response.status === 200) {
            toast.success("Profile Updated Successfully");
            getAdminProfileData();
            const profileData = response?.data;
            sessionStorage.setItem("dp", profileData?.profile);
            sessionStorage.setItem("uname", profileData?.username);
            sessionStorage.setItem("bio", profileData?.bio);
            setAdminProfileStatus(profileData);
          } else {
            toast.error("Error Updating Profile");
          }
        } else {
          const response = await updateAdminProfileApi(profileData);
          console.log(response);
          if (response.status === 200) {
            toast.success("Profile Updated Successfully");
            getAdminProfileData();
            const profileData = response?.data;
            sessionStorage.setItem("dp", profileData?.profile);
            sessionStorage.setItem("uname", profileData?.username);
            sessionStorage.setItem("bio", profileData?.bio);
            setAdminProfileStatus(profileData);
          } else {
            toast.error("Something went wrong! Try Again");
          }
        }
      }
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="min-h-[60vh] md:grid grid-cols-4">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-3">
          <h1 className="text-center text-3xl my-5">Admin Settings</h1>
          <div className="md:grid grid-cols-2">
            <div className="p-3">
              <p className="text-justify">
               {profileData.bio}
              </p>
              <p className="text-justify mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, iure id, iste eligendi repellendus ea consequatur
                deserunt nesciunt perferendis illo doloremque, unde magni.
                Libero assumenda praesentium suscipit eos consectetur aliquam.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                architecto temporibus quas laudantium, nesciunt quia excepturi
                porro pariatur deserunt exercitationem, modi error debitis ex,
                sed ratione ab ipsam at consectetur. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Reprehenderit alias temporibus, ad
                adipisci dolores autem consequatur tempora doloremque molestiae
                unde laudantium ratione veniam aspernatur, inventore totam nemo
                illo rerum repellat!
              </p>
            </div>
            <div className="p-2">
              <div className="w-full h-full bg-blue-300 py-4 px-7 rounded">
                <div className="relative">
                  <label htmlFor="profile_pic" className="position-relative d-flex justify-content-center align-items-center">
                          <input type="file" name="" className='d-none' id="profile_pic" onChange={(e) => { handleImageUpload(e) }} />
                          {
                            preview ?
                              <>
                                <img
                                  src={preview}
                                  alt="Profile"
                                  style={{
                                    borderRadius: "50%",
                                    width: "110px",
                                    height: "110px",
                                    objectFit: "cover",
                                    backgroundPosition: "top",
                                    backgroundRepeat: "no-repeat"
                                  }}
                                />
                                <RiImageEditLine size={27} style={{
                                  top: "85",
                                  left: "65",
                                  cursor: "pointer",
                                  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.89)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  backgroundColor: "white"
                                }} color='black' className='position-absolute' />
                              </>
                              :
                              <>
                                <img
                                  src={profileData?.profilePic ? profileData?.profilePic.startsWith("https://lh3.googleusercontent.com") ? profileData?.profilePic : `${base_url}/uploadImg/${profileData?.profilePic}` : "https://i.guim.co.uk/img/media/dd3acbcaaf6da1b900426ab7ca78bdab3338bf0b/333_91_2292_1376/master/2292.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=7c0e8d567682dde9fb072f573b8f3b85"}
                                  alt="Profile"
                                  style={{
                                    borderRadius: "50%",
                                    width: "110px",
                                    height: "110px",
                                    objectFit: "cover",
                                    backgroundPosition: "top",
                                    backgroundRepeat: "no-repeat"
                                  }}
                                />
                                <RiImageEditLine size={27} style={{
                                  top: "85",
                                  left: "65",
                                  cursor: "pointer",
                                  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.89)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  backgroundColor: "white"
                                }} color='black' className='position-absolute' />
                              </>

                          }
                        </label>
                </div>
                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-5 py-2"
                  placeholder="Username"
                  onChange={(e)=>{setProfileData({...profileData,username:e.target.value})}}
                  defaultValue={profileData.username}
                />
                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-5 py-2"
                  placeholder="Bio"
                   onChange={(e)=>{setProfileData({...profileData,bio:e.target.value})}}
                  defaultValue={profileData.bio}
                />
                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-5 py-2"
                  placeholder="Password"
                   onChange={(e)=>{setProfileData({...profileData,password:e.target.value})}}
                  defaultValue={profileData.password}
                />
                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-5 py-2"
                  placeholder="Confirm password"
                   onChange={(e)=>{setProfileData({...profileData,confirmPassword:e.target.value})}}
                  defaultValue={profileData.confirmPassword}
                />
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <button  className="bg-red-500 text-white p-3 hover:bg-white hover:border-red-500 hover:text-red-500 rounded">
                    Reset
                  </button>
                  <button onClick={handleProfileEdit} className="bg-green-500 text-white p-3 hover:bg-white hover:border-red-500  hover:text-green-500 rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings;