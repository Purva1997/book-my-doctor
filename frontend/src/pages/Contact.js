import { assets } from "../assets/assets"

function contact () {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
            </div>
            <div className="my-10 flex flex-col justify-center gap-10 md:flex-row mb:28 text-sm ">
                <img className="w-full md:max-w-[360px]" src={assets.contact_image}></img>
                <div className="flex flex-col justify-center items-start  gap-6 ">
                    <p className="font-semibold text-xl text-gray-600">OUR OFFICE</p>
                    <p className="text-gray-500">114 ,Thube Park<br></br> Office 16, Pune, INDIA</p>
                    <p className="text-gray-500 ">Tel: 123 456 7890<br /> Email:bookmydoctor@gmail.com</p>
                </div>
            </div>

        </div>
    )
}

export default contact