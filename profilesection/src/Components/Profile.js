import axios from "axios";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const [Profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({
    Profile_img: "",
    Profile_Name: "",
    Email: "",
    Mobile_No: "",
    age: "",
    Gender: "",
  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a backend endpoint at http://localhost:3002/profile
      const response = await axios.post(
        "http://localhost:3002/addprofile",
        formData
      );

      // Handle the response, e.g., show a success message
      console.log("Profile submitted successfully:", response.data);

      // Optionally, you can reset the form after successful submission
    setProfile({
        Profile_img: "",
        Profile_Name: "",
        Email: "",
        Mobile_No: "",
        age: "",
        Gender: "",
      });
      setOpen(false);
      setFormData("")
      setProfile([...Profile, response.data]);

    alert("Profile data has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting profile:", error);
      // Handle the error, e.g., show an error message
    }
  };

  const [open, setOpen] = useState(false);
  const [EditingProfile, setEditingProfile] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/profile")
      .then(function (response) {
        // Assuming the API response is an array of todos
        setProfile(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);
  const Update = (i, _id) => {
    const selectedProfile = Profile.find((item) => item._id === _id);
    if (selectedProfile) {
      setFormData({ ...selectedProfile });
      setEditingProfile(selectedProfile);
      setOpen(true);
    }
  };
  const Delete = async (i, _id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/delete/${_id}`
      );
      console.log("Delete Success:", response.data);

      // Assuming the response contains the updated todos
      setProfile((prevProfile) =>
        prevProfile.filter((item) => item._id !== _id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
      // Provide user feedback on error if needed
    }
  };

  return (
    <div className="p-4 flex-col bg-slate-400 h-screen justify-center">
      <button
        onClick={() => setOpen(true)}
        className= "m-4 ml-auto bg-blue-500 justify-end flex text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        New User
      </button>
      <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${Profile.length === 0 ? 'hidden' : ''}`}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 max-w-[50px] py-3">S.No</th>
              <th className="px-6 max-w-[200px] py-3">Profile Img</th>

              <th scope="col" className="px-6 py-3">
                Profile Name
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Age</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Gender</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Mobile No</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Email</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {Profile &&
              Profile.map((item, i) => (
                <tr
                  key={i}
                  className=" border-0 border-b-2 hover:bg-slate-100 border-b-slate-400 bg-white dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{i + 1}</td>

                  <th
                    scope="row"
                    className="px-6 py-4 max-w-[150px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      src={item.Profile_img}
                      alt="Profile_img"
                      className="w-[60px] rounded-2xl"
                    />
                  </th>
                  <td className="px-6 text-black text-[16px] text-start py-4">
                    {item.Profile_Name}
                  </td>
                  <td className="px-6 py-4">{item.age}</td>
                  <td className="px-6 py-4">{item.Gender}</td>
                  <td className="px-6 py-4">{item.Mobile_No}</td>
                  <td className="px-6 py-4">{item.Email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="Submit"
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-1 hover:shadow-lg rounded border-slate-800 border-2 text-white"
                      onClick={() => Update(i, item._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="Submit"
                      className=" bg-red-400 hover:bg-red-600 border-slate-800 py-1 hover:shadow-lg rounded px-4 border-2 text-white"
                      onClick={() => Delete(i, item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal Start form hear */}

      <div className=" flex items-center justify-center">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={() => setOpen(false)}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block   align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="relative flex justify-center bg-teal-700">
                    <div className="text-center flex text-2xl py-4 text-white">
                      Upadte New Profile Info
                    </div>
                    <div>
                      <XMarkIcon
                        type="button"
                        className=" w-full h-10 absolute right-0  flex align-top justify-right hover:text-black border-slate-500 shadow-sm px-4 py-2 bg-transparent rounded text-2xl font-large text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      ></XMarkIcon>
                    </div>
                  </div>
                  <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#" onSubmit={handleSubmit}>
                      <div>
                        <label
                          for="Profile_img"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Profile Pic
                        </label>
                        <input
                          type="file"
                          name="Profile_img"
                          id="Profile_img"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          accept="image/*"
                          value={formData.Profile_img || "../assets/logo.png" }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              Profile_img: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          for="Profile_Name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="Profile_Name"
                          id="Profile_Name"
                          value={formData.Profile_Name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              Profile_Name: e.target.value,
                            })
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter your name.."
                          required
                        />
                      </div>

                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          value={formData.Email}
                          onChange={(e) =>
                            setFormData({ ...formData, Email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          for="Mobile_No"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Mobile No
                        </label>
                        <input
                          type="text"
                          name="Mobile_No"
                          id="Mobile_No"
                          placeholder="Enter your mobile no"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          accept="Number"
                          required
                          value={formData.Mobile_No}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              Mobile_No: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-[100%] flex justify-between">
                        <div className="w-[30%] mx-2">
                          <label
                            for="Age"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your Age
                          </label>
                          <input
                            type="number"
                            name="Age"
                            id="Age"
                            placeholder="Enter your Age"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                            value={formData.age}
                            onChange={(e) =>
                              setFormData({ ...formData, age: e.target.value })
                            }
                          />
                        </div>
                        <div className="w-[70%] mx-2">
                          <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your Gender
                          </label>
                          <div className="flex justify-evenly">
                            <div>
                              <input
                                type="radio"
                                id="female"
                                name="Gender"
                                value="female"
                                className="mx-2 mb-1"
                                checked={formData.Gender === "female"}
                                onChange={() =>
                                  setFormData({ ...formData, Gender: "female" })
                                }
                              />
                              <label htmlFor="female">female</label>
                            </div>

                            <div>
                              <input
                                type="radio"
                                id="Male"
                                name="Gender"
                                value="Male"
                                className="mx-2 mb-1"
                                checked={formData.Gender === "Male"}
                                onChange={() =>
                                  setFormData({ ...formData, Gender: "Male" })
                                }
                              />
                              <label htmlFor="Male">Male</label>
                            </div>

                            <div>
                              <input
                                type="radio"
                                id="Other"
                                name="Gender"
                                value="Other"
                                className="mx-2 mb-1"
                                checked={formData.Gender === "Other"}
                                onChange={() =>
                                  setFormData({ ...formData, Gender: "Other" })
                                }
                              />
                              <label htmlFor="Other">Other</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit Your Profile
                      </button>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default Profile;
