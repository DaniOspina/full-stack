import React from "react";

const Banner = () => {
    return (
        <div className="relative w-full h-64 md:h-96 bg-gray-800 text-white flex items-center justify-center">
            <img 
                src="https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/cineseries/images/2023/07/20/2023072006195659364.png" 
                alt="The Dark Knight"
                className="absolute w-full h-full object-cover opacity-50"
            />
            <h1 className="relative text-3xl md:text-5xl font-bold text-center">
                The Dark Knight - Personajes
            </h1>
        </div>
    );
};

export default Banner;
