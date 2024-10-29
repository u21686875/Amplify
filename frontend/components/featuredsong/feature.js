import React from "react";
import { Play, Heart } from "lucide-react";

class FeaturedSong extends React.Component {
    render() {
        return (
            <div className="relative h-[45%] mb-8 rounded-lg overflow-hidden">
                <img
                    src="/assets/images/featured/BJA7RzO.jpeg"
                    alt="Featured Song"
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 right-0 p-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="float-right font-medium mb-10">
                        FEATURED SONGS
                    </div>

                    <h4 className="text-[29px] font-light">
                        Doomer Scape
                    </h4>

                    <h3 className="text-[46px]">
                        Zangetsu
                    </h3>

                    <div className="float-right pt-10 flex items-center gap-10">
                        <Heart className="cursor-pointer" size={24} />
                        <button className="flex items-center bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors">
                            <Play size={16} className="mr-1" />
                            Play
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeaturedSong;