import CarouselItem from '@/components/ui/carousel-item';

const carouselImage = ()=>{
    return (
         <div className="w-full inline-flex flex-nowrap bg-white group overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,white,_white_calc(100%-500px),transparent_100%)] ">
            <CarouselItem/>
        </div>
    );
};

export default carouselImage;
