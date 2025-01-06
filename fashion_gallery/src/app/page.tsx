
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import SliderCards from "@/components/sliderCards";
import WomenSliderCards from "@/components/WomenSlider";
import KidsSlider from "@/components/kidsSlider";
import Footer from "@/components/Footer";
export default function Page() {
  const images = [
    { id: 1, src: '/c1.avif', alt: 'Image 1' },
    { id: 2, src: '/c2.avif', alt: 'Image 2' },
    { id: 3, src: '/c3.avif', alt: 'Image 3' },
  ];

  return (
    <div className="">
      <Header />
     
      <Carousel images={images} />
      <div className="mt-12 mx-4 sm:mx-10">
        <section id="mens" className="mb-16">
          <div className="items-center max-w-3xl mx-auto text-center mt-16 mb-8 ">
            <h2 className="flex flex-row flex-nowrap items-center justify-center mt-30  ">
              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
                Mens Wear
              </span>
            </h2>
          </div>
          <SliderCards />
        </section>
        <section id="womens" className="mb-16">
          <div className="items-center max-w-3xl mx-auto text-center mt-16 mb-10">
            <h2 className="flex flex-row flex-nowrap items-center justify-center mt-24">
              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
                Womens Wear
              </span>
            </h2>
          </div>
          <WomenSliderCards />
        </section>
        <section id="kids" className="mb-16">
          <div className="items-center max-w-3xl mx-auto text-center mt-16 mb-16">
            <h2 className="flex flex-row flex-nowrap items-center justify-center mt-24">
              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
                Kids Wear
              </span>
            </h2>
          </div>
          <KidsSlider/>
        </section>
      </div>
      <Footer />
    </div>
  );
}