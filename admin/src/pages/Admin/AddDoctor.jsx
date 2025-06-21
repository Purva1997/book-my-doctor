import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [specialization, setSpecialization] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (
        !docImg ||
        !email ||
        !name ||
        !password ||
        !fees ||
        !about ||
        !specialization ||
        !degree ||
        !address1 ||
        !address2
      ) {
        return toast.error("All fields are required");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("specialization", specialization);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);

        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium ">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 cursor-pointer rounded-full"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            ></img>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          ></input>
          <p>
            Upload doctor
            <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row item-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 ">
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter your name"
                required
              ></input>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Enter your email"
                required
              ></input>
            </div>

            <div className="flex-1 flex flex-col gap-1 ">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Enter your password"
                required
              ></input>
            </div>

            <div className="flex-1 flex flex-col gap-1 ">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="11 Year">11 Year</option>
                <option value="12 Year">12 Year</option>
                <option value="13 Year">13 Year</option>
                <option value="14 Year">14 Year</option>
                <option value="15 Year">15 Year</option>
                <option value="16 Year">16 Year</option>
                <option value="17 Year">17 Year</option>
                <option value="18 Year">18 Year</option>
                <option value="19 Year">19 Year</option>
                <option value="20 Year">20 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1 ">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              ></input>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 ">
              <p>Specialization</p>
              <select
                onChange={(e) => setSpecialization(e.target.value)}
                value={specialization}
                className="border rounded px-3 py-2"
              >
                <option value="Gynecologist">Gynecologist</option>
                <option value="General Physician">General Physician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1 ">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter your education"
                required
              ></input>
            </div>

            <div className="flex-1 flex flex-col gap-1 ">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              ></input>
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              ></input>
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="About doctor"
            rows={5}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 mt-4  rounded-full"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
