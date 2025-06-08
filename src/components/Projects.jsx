import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { useEffect, useRef } from 'react'
import { LuFileText, LuHammer, LuMapPin } from 'react-icons/lu'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

const projects = [
  {
    image: '/images/projects/case1/case_1.jpeg',
    place: 'Калининградская обл., г. Калининград, р. Преголя',
    document: 'Договор водопользования',
    type: 'Бетонный понтон',
    images: [
      '/images/projects/case1/case_1.jpeg',
      '/images/projects/case1/case_2.jpeg',
      '/images/projects/case1/case_3.jpeg',
      '/images/projects/case1/case_4.jpeg',
      '/images/projects/case1/case_5.jpeg',
      '/images/projects/case1/case_6.jpeg',
    ],
  },
  {
    image: '/images/projects/case2/case_1.jpeg',
    place: 'Тверская обл., Конаковский р-н, р. Волга',
    document: 'Решение о предоставление водного объекта в пользование для строительства ГТС',
    type: 'П-образный свайный пирс',
    images: [
      '/images/projects/case2/case_1.jpeg',
      '/images/projects/case2/case_2.jpeg',
      '/images/projects/case2/case_3.jpeg',
      '/images/projects/case2/case_4.jpeg',
      '/images/projects/case2/case_5.jpeg',
      '/images/projects/case2/case_6.jpeg',
      '/images/projects/case2/case_7.jpeg',
      '/images/projects/case2/case_8.jpeg',
      '/images/projects/case2/case_9.jpeg',
    ],
  },
  {
    image: '/images/projects/case3/case_1.jpeg',
    place: 'Респ. Мордовия, р. Алтырь',
    document: 'Решение о предоставление водного объекта в пользование для строительства ГТС',
    type: 'Пассажирский причал',
    images: [
      '/images/projects/case3/case_1.jpeg',
      '/images/projects/case3/case_2.jpeg',
      '/images/projects/case3/case_3.jpeg',
      '/images/projects/case3/case_4.jpeg',
      '/images/projects/case3/case_5.jpeg',
    ],
  },
  {
    image: '/images/projects/case4/case_1.jpeg',
    place: 'Респ. Карелия, Прионежский р-н, р. Пухта',
    document: 'Решение о предоставление водного объекта в пользование для строительства ГТС',
    type: 'Свайный пирс',
    images: [
      '/images/projects/case4/case_1.jpeg',
      '/images/projects/case4/case_2.jpeg',
      '/images/projects/case4/case_3.jpeg',
    ],
  },
  {
    image: '/images/projects/case5/case_1.jpeg',
    place: 'Респ. Северная Осетия-Алания, Кировский р-н, р. Камбилеевка',
    document: 'Решение о предоставление водного объекта в пользование для строительства ГТС',
    type: 'Шлюз',
    images: [],
  },
]

export default function Projects() {
  const galleryRefs = useRef({})

  useEffect(() => {
    projects.forEach((project, index) => {
      if (project.images.length > 0) {
        const galleryElement = document.getElementById(`gallery-${index}`)
        if (galleryElement) {
          galleryRefs.current[index] = lightGallery(galleryElement, {
            plugins: [lgThumbnail, lgZoom],
            dynamic: true,
            dynamicEl: project.images.map(img => ({
              src: img,
              thumb: img,
            })),
            speed: 500,
            download: false,
            counter: true,
          })
        }
      }
    })

    return () => {
      Object.values(galleryRefs.current).forEach((gallery) => {
        if (gallery) {
          gallery.destroy()
        }
      })
    }
  }, [])

  const openGallery = (index) => {
    if (galleryRefs.current[index]) {
      galleryRefs.current[index].openGallery(0)
    }
  }

  return (
    <>
      <Carousel opts={{ loop: true }} plugins={[AutoScroll({ delay: 0, stopOnMouseEnter: true, stopOnInteraction: false })]} className="w-full border-r-2 border-l-2 border-primary relative after:absolute after:right-0 after:top-0 after:bg-gradient-to-l after:h-full after:w-1/2 after:from-primary/20 after:to-transparent after:z-10 before:absolute before:left-0 before:top-0 before:bg-gradient-to-r before:h-full before:w-1/2 before:from-primary/20 before:to-transparent before:z-10 before:pointer-events-none after:pointer-events-none">
        <CarouselContent className="-ml-12 flex">
          {projects.map((project, index) => (
            <CarouselItem className="md:basis-1/2 xl:basis-1/3 pl-12" key={index}>
              <div className="rounded-lg border-[1px] sm:border-2 border-primary/50 h-full flex flex-col gap-3 bg-primary/10 p-6 pb-5">
                <button
                  id={`gallery-${index}`}
                  className="cursor-pointer"
                  onClick={() => project.images.length > 0 && openGallery(index)}
                >
                  <img
                    src={project.image}
                    className="rounded-md w-full h-[200px] object-cover"
                    alt={`Проект ${index + 1}`}
                  />
                </button>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex text-sm gap-2 text-muted-foreground">
                    <LuHammer className="size-5 shrink-0" />
                    <span>{project.type}</span>
                  </span>
                  <span className="inline-flex text-sm gap-2 text-muted-foreground">
                    <LuMapPin className="size-5 shrink-0" />
                    <span>{project.place}</span>
                  </span>
                  <span className="inline-flex text-sm gap-2 text-muted-foreground">
                    <LuFileText className="size-5 shrink-0" />
                    <span>{project.document}</span>
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}
