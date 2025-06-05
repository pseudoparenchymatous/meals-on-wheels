import CarouselItem from '@/components/ui/carousel-item';

const carouselImage = ()=>{
    return (
        <section className='text-center'>
         <div className="w-full inline-flex flex-nowrap bg-white group overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,white,_white_calc(100%-500px),transparent_100%)] ">
            <CarouselItem/>
        </div>
        <h1 className='mt-4 text-3xl not-italic font-bold pb-10'>Our Partners</h1>
        </section>
    );
};

export default carouselImage;
