import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full mx-w-6xl m-5">
      <p className="mb-5 text-lg font-medium ">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b  ">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Time & Date</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions </p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] item-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50  "
          >
            <p className="max-sm:hidden">{index + 1} </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded"
                src={item.userData.image}
                alt=""
              ></img>
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden"> {calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormate(item.slotDate)},{item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded bg-gray-200"
                src={item.docData.image}
                alt=""
              ></img>
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-xs font-medium text-red-300">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-xs font-medium text-green-300">Completed</p>
            ) : (
              <img
                onClick={() => {
                  cancelAppointment(item._id);
                }}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              ></img>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
