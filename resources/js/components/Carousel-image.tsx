
const carouselImage = ()=>{
    return (
         <div className="w-full inline-flex flex-nowrap bg-white group overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,white,_white_calc(100%-500px),transparent_100%)] ">
            <ul className="flex items-center justify-center  md:justify-start [&_li]:mx-8 [&_img]:max-w-50 animate-infinite-scroll ">
                <li>
                    <img src="storage/images/shawa-foods-img.svg" alt="Shawa Foods"/>
                </li>
                <li>
                    <img src="storage/images/nissin-img.svg" alt="Nissin"/>
                </li> 
                <li>
                    <img src="storage/images/kfc-img.svg" alt="KFC"/>
                </li>
                <li>
                    <img src="storage/images/churchs-chicken-img.svg" alt="Churchs chicken"/>
                </li>
                <li>
                    <img src="storage/images/burger-king-img.svg" alt="Burger King"/>
                </li>
                <li>
                    <img src="storage/images/facility-foods-img.svg" alt="Facility Foods"/>
                </li>
                <li>
                    <img src="storage/images/philips-food-img.svg" alt="Philips food"/>
                </li>
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-50 animate-infinite-scroll" aria-hidden="true">
                <li>
                    <img src="storage/images/Box1.svg" alt="Shawa Foods"/>
                </li>
                <li>
                    <img src="storage/images/Box2.svg" alt="Nissin"/>
                </li>
                <li>
                    <img src="storage/images/Box3.svg" alt="Philips Food"/>
                </li>
                <li>
                    <img src="storage/images/Box4.svg" alt="KFC"/>
                </li>
                <li>
                    <img src="storage/images/Box5.svg" alt="Burger King"/>
                </li>
                <li>
                    <img src="storage/images/Box6.svg" alt="Facility Foods"/>
                </li>
                <li>
                    <img src="storage/images/Box7.svg" alt="Chruch's Chicken"/>
                </li>
            </ul>
        </div>
    );
};

export default carouselImage;
