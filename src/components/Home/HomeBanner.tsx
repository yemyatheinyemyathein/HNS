import { motion } from "framer-motion";

const HomeBanner = () => {
    return (
        <div className="min-h-[100vh] flex justify-between py-12">
            <motion.div className="max-w-1/2">
                <h1 className="text-[95px] font-semibold leading-[6rem] tracking-[0.5rem]">HNS SIM Card</h1>
                <p className="text-[20px] my-3 font-system-ui">Discover the best SIM card deals for your either business or personal. Browse our selection of affordable packages with reliable coverage and safe.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="text-[16px] text-[#050505] bg-white rounded-full px-12 py-6">Shop Now</button>
                    <button className="text-[16px] text-[#DADAD9] rounded-full px-12 py-6">Explore Options</button>
                </div>
            </motion.div>
            <motion.div>
                image of photos
            </motion.div>
        </div>
    )
}

export default HomeBanner