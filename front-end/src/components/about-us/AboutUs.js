import React from "react";

const AboutUs = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex justify-center items-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-30 animate-pulse bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 z-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 z-0"></div>

            <div className="relative bg-[#edededa2] p-8 rounded-3xl shadow-2xl w-full max-w-[80vw] z-20 transform transition-all duration-500  hover:shadow-2xl">
                {/* About Us Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    {/* Left Column - About Us Text */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 pb-4">About Us</h1>
                        <p className="text-base leading-6 text-gray-600 mb-4">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                        <p className="text-base leading-6 text-gray-600">
                            In the first place, we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire.
                        </p>
                    </div>
                    {/* Right Column - Image */}
                    <div className="w-full lg:w-7/12">
                        <img
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                            alt="A group of People"
                        />
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 pt-12">
                    {/* Left Column - Our Story Text */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 pb-4">Our Story</h1>
                        <p className="text-base leading-6 text-gray-600 mb-4">
                            Our journey began with a vision to create innovative solutions. Over the years, we've evolved and grown stronger as a team.
                        </p>
                        <p className="text-base leading-6 text-gray-600">
                            Our goal is to continue building exceptional solutions that make lives easier, staying true to our values of quality, trust, and collaboration.
                        </p>
                    </div>
                    {/* Right Column - Team Members */}
                    <div className="w-full lg:w-7/12 lg:pt-8">
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                            {["Alexa", "Olivia", "Liam", "Elijah"].map((name, index) => (
                                <div key={index} className="p-4 pb-6 flex justify-center flex-col items-center">
                                    <img
                                        className="md:block hidden rounded-full shadow-lg"
                                        src={`https://i.ibb.co/${name === "Alexa" ? "FYTKDG6" : name === "Olivia" ? "fGmxhVy" : name === "Liam" ? "Pc6XVVC" : "7nSJPXQ"}/Rectangle-118-2.png`}
                                        alt={name}
                                    />
                                    <img
                                        className="md:hidden block rounded-full shadow-lg"
                                        src={`https://i.ibb.co/${name === "Alexa" ? "zHjXqg4" : name === "Olivia" ? "NrWKJ1M" : name === "Liam" ? "C5MMBcs" : "ThZBWxH"}/Rectangle-118.png`}
                                        alt={name}
                                    />
                                    <p className="font-medium text-xl leading-5 text-gray-800 mt-4">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-12">
                    <p className="text-xl font-semibold text-gray-800 mb-4">Join Us in Our Mission to Innovate</p>
                    <p className="text-lg text-gray-600 mb-4">
                        We're always looking for talented individuals who are passionate about creating solutions that make a real difference. Let’s work together to shape the future.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:bg-gradient-to-l transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
