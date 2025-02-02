import { motion } from "framer-motion";
import Banner from "../../assets/Home/Banner3.jpg"
import { Wave } from "../../svg/svg";

const HomeBanner = () => {
    return (
        <div className="min-h-[120vh] w-full flex justify-center items-center py-12 relative"
            style={{
                backgroundImage: `url(${Banner})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                height: '100vh',
            }}>
        <div className="absolute w-full h-full bg-gradient-to-b from-gray-100 to-transparent"/>
            <motion.div className="absolute top-0 left-0 max-w-1/2 z-12">
                <h1 className="text-[95px] font-semibold leading-[6rem] tracking-[0.5rem]">HNS SIM Card</h1>
                <p className="text-[20px] my-3 font-system-ui">Discover the best SIM card deals for your either business or personal. Browse our selection of affordable packages with reliable coverage and safe.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="text-[16px] text-[#050505] bg-white rounded-full px-12 py-6">Shop Now</button>
                    <button className="text-[16px] text-[#DADAD9] rounded-full px-12 py-6">Explore Options</button>
                </div>
            </motion.div>
            <div className="absolute w-full bottom-0 left-0">
                <Wave />
            </div>
        </div>
    )
}

export default HomeBanner