import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
    return (
        <div>
            <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1631210616947-26304889117c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-200">
                <img className="w-1/4 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <div className="bg-white px-4 py-4 pb-7">
                    <h2 className="text-3xl font-bold">Get started with Uber</h2>
                    <Link to="/users/login">
                        <div className="relative flex items-center justify-center w-full bg-black text-white rounded py-3 mt-5 px-4">
                            Continue
                            <FaArrowRightLong className="absolute right-4" />
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    );
}

export default Home;