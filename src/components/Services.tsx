import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
	Monitor,
	Smartphone,
	Palette,
	Server,
	Cloud,
	Brain,
	Settings,
	Database,
	Briefcase,
} from 'lucide-react'

type Service = {
	icon: React.ComponentType<any>
	title: string
	description: string
	color?: string
}

const services: Service[] = [
	{
		icon: Monitor,
		title: 'Web Development',
		description:
			'Building responsive and scalable web applications with modern technologies and best practices for optimal performance.',
		color: '#3b82f6',
	},
	{
		icon: Smartphone,
		title: 'Mobile Development',
		description:
			'Creating native and cross-platform mobile applications that deliver seamless user experiences across devices.',
		color: '#06b6d4',
	},
	{
		icon: Palette,
		title: 'UI/UX Design',
		description:
			'Designing intuitive and engaging user interfaces with a focus on usability and aesthetic excellence.',
		color: '#ec4899',
	},
	{
		icon: Server,
		title: 'Backend Development',
		description:
			'Developing robust server-side solutions with secure APIs and efficient database management systems.',
		color: '#f59e0b',
	},
	{
		icon: Cloud,
		title: 'Cloud Solutions',
		description: 'Implementing scalable cloud infrastructure and services for enhanced performance and reliability.',
		color: '#8b5cf6',
	},
	{
		icon: Brain,
		title: 'AI Integration',
		description: 'Integrating artificial intelligence and machine learning capabilities to automate and enhance business processes.',
		color: '#06b6d4',
	},
	{
		icon: Settings,
		title: 'DevOps Engineering',
		description: 'Streamlining development workflows with continuous integration, deployment, and infrastructure automation.',
		color: '#fb923c',
	},
	{
		icon: Database,
		title: 'Database Solutions',
		description: 'Designing and optimizing database architectures for high-performance data management and analytics.',
		color: '#10b981',
	},
	{
		icon: Briefcase,
		title: 'Technical Consulting',
		description: 'Providing expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.',
		color: '#f472b6',
	},
]

export default function Services() {
	const carouselRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)

	// resume timeout ref used to auto-resume autoplay after user interaction
	const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	// how long to wait (ms) after user interaction before resuming autoplay
	const AUTOPLAY_RESUME_DELAY = 800

	const pauseAutoplayTemporarily = (delay = AUTOPLAY_RESUME_DELAY) => {
		setIsAutoPlaying(false)
		if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
		resumeTimeoutRef.current = setTimeout(() => {
			setIsAutoPlaying(true)
			resumeTimeoutRef.current = null
		}, delay)
	}

	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200)

	// template layout constants - responsive: show 1 card on mobile, otherwise 3 cards
	const GAP = windowWidth < 640 ? 8 : windowWidth < 1024 ? 12 : 16
	const HOVER_PADDING = 24 // Extra padding to prevent hover clipping

	const getItemsPerView = (w?: number) => {
		const width = typeof w === 'number' ? w : windowWidth
		return width < 640 ? 1 : 3
	}

	const [itemsPerView, setItemsPerView] = useState(() => getItemsPerView(typeof window !== 'undefined' ? window.innerWidth : undefined))

	useEffect(() => {
		const handleResize = () => {
			const w = window.innerWidth
			setWindowWidth(w)
			setItemsPerView(getItemsPerView(w))
		}

		// run once on mount to ensure correct initial layout
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const totalGap = GAP * (itemsPerView - 1)
	const cardWidthCalc = `calc((100% - ${totalGap}px) / ${itemsPerView})`

	const getNavOffset = (w: number, side: 'left' | 'right') => {
		if (w <= 480) return side === 'left' ? '12px' : '12px'
		if (w <= 640) return side === 'left' ? '4px' : '4px'
		if (w <= 1005) return side === 'left' ? '-20px' : '-20px'
		if (w <= 1085) return side === 'left' ? '-30px' : '-30px'
		if (w <= 1200) return side === 'left' ? '-50px' : '-55px'
		if (w <= 1300) return side === 'left' ? '-40px' : '-45px'
		return side === 'left' ? '-60px' : '-65px'
	}

	const maxIndex = Math.max(0, services.length - itemsPerView)

	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	}

	const scrollToPosition = (index: number) => {
		if (!carouselRef.current) return
		const newIndex = Math.max(0, Math.min(index, maxIndex))
		const itemWidth = carouselRef.current.scrollWidth / services.length
		carouselRef.current.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' })
		setCurrentIndex(newIndex)
	}

	const AUTOPLAY_INTERVAL = 2000

	useEffect(() => {
		if (!isAutoPlaying) return

		const interval = setInterval(() => {
			scrollToPosition(currentIndex >= maxIndex ? 0 : currentIndex + 1)
		}, AUTOPLAY_INTERVAL)

		return () => clearInterval(interval)
	}, [isAutoPlaying, maxIndex, currentIndex])

	useEffect(() => {
		return () => {
			if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
		}
	}, [])

	const scrollToIndex = (index: number) => scrollToPosition(index)

	const handlePrev = () => {
		pauseAutoplayTemporarily()
		const target = currentIndex <= 0 ? maxIndex : currentIndex - 1
		scrollToIndex(target)
	}

	const handleNext = () => {
		pauseAutoplayTemporarily()
		const target = currentIndex >= maxIndex ? 0 : currentIndex + 1
		scrollToIndex(target)
	}

	useEffect(() => {
		if (currentIndex > maxIndex) scrollToPosition(maxIndex)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemsPerView])

	return (
		<section id="services" className="py-10 sm:py-12 lg:py-16">
			<motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div variants={itemVariants} className="mb-6 sm:mb-8 lg:mb-12 text-center">
					<h2 className="text-4xl md:text-5xl font-poppins font-bold mb-3">
						Professional <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Services</span>
					</h2>
					<p className="text-text-secondary max-w-2xl mx-auto">Professional development services focused on delivering quality solutions</p>
				</motion.div>

				{/* Carousel Container */}
				<motion.div variants={itemVariants} className="relative mt-6 sm:mt-8">
					{/* Outer wrapper for hover overflow */}
					<div className="overflow-visible" style={{ padding: `${HOVER_PADDING}px 0`, margin: `${-HOVER_PADDING}px 0` }}>
						{/* Clip container to hide partial cards */}
						<div
							ref={carouselRef}
						className="overflow-hidden scroll-smooth"
							style={{ scrollSnapType: 'x mandatory' }}
							onMouseEnter={() => setIsAutoPlaying(false)}
							onMouseLeave={() => setIsAutoPlaying(true)}
						>
							<div className="flex transition-transform duration-500 ease-in-out" style={{ gap: `${GAP}px` }}>
							{services.map((s, idx) => {
								const Icon = s.icon
								return (
									<div
										key={s.title}
										className="flex-shrink-0 overflow-visible"
										style={{ width: cardWidthCalc, scrollSnapAlign: 'start' }}
									>
										<motion.article
											className="relative z-0 group p-4 sm:p-5 md:p-6 transition-colors duration-200 ease-in-out h-full cursor-pointer bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.01] backdrop-blur-md backdrop-saturate-150 border-2 sm:border-3 md:border-4 border-accent/20 ring-1 ring-accent/[0.08] shadow-sm hover:border-accent hover:ring-4 hover:ring-accent/30"
											style={{ borderRadius: windowWidth < 640 ? '16px' : '20px' }}
											role="button"
											tabIndex={0}
											onClick={() => {
												pauseAutoplayTemporarily()
												const target = Math.min(Math.max(idx - Math.floor(itemsPerView / 2), 0), maxIndex)
												scrollToIndex(target)
											}}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault()
													pauseAutoplayTemporarily()
													const target = Math.min(Math.max(idx - Math.floor(itemsPerView / 2), 0), maxIndex)
													scrollToIndex(target)
												}
											}}
											aria-labelledby={`service-${idx}`}
										>
											<div className="text-center">
												<div
												className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] bg-white/[0.14] mx-auto rounded-lg sm:rounded-xl flex items-center justify-center transition-colors duration-200"
												style={{ border: '1.5px solid', borderColor: s.color ?? '#ffffff' }}
											>
												<Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: s.color ?? '#ffffff' }} />
											</div>
											<h3 id={`service-${idx}`} className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold mt-3 sm:mt-4 text-white">
												{s.title}
											</h3>
											<p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed text-white/80">{s.description}</p>
											</div>
										</motion.article>
									</div>
								)
							})}
							</div>
						</div>
					</div>

					{/* Navigation Arrows */}
					{services.length > itemsPerView && (
						<>
							<button
								onClick={handlePrev}
								disabled={currentIndex === 0}
								className="absolute top-1/2 -translate-y-1/2 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
								style={{ left: getNavOffset(windowWidth, 'left') }}
								aria-label="Previous services"
							>
								<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2.5} />
							</button>

							<button
								onClick={handleNext}
								disabled={currentIndex >= maxIndex}
								className="absolute top-1/2 -translate-y-1/2 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
								style={{ right: getNavOffset(windowWidth, 'right') }}
								aria-label="Next services"
							>
								<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2.5} />
							</button>
						</>
					)}

					{/* Carousel Indicators */}
					<div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
						{Array.from({ length: maxIndex + 1 }).map((_, i) => {
							const isActive = i === currentIndex
							return (
								<button
									key={`dot-${i}`}
									onClick={() => {
										pauseAutoplayTemporarily()
										scrollToIndex(i)
									}}
									aria-label={`Show page ${i + 1}`}
									className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
								>
									<span className={`absolute inset-0 rounded-full ${isActive ? 'bg-accent/20' : 'bg-white/10'}`} />
									<span className={`${isActive ? 'w-2 h-2 md:w-2 md:h-2 bg-accent rounded-full shadow-sm' : 'w-1.5 h-1.5 bg-white/60 rounded-full'}`} />
								</button>
							)
						})}
					</div>
				</motion.div>

				{/* CTA Banner */}
			<motion.div variants={itemVariants} className="mt-8 sm:mt-10 lg:mt-12 rounded-xl sm:rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10 text-center">
				<div className="max-w-4xl mx-auto">
					<h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-white mb-3 sm:mb-4">Let&apos;s Work Together</h3>
					<p className="text-xs sm:text-sm md:text-base text-text-secondary max-w-2xl mx-auto mb-4 sm:mb-6 px-2">Ready to bring your ideas to life? Let&apos;s create something amazing together</p>
					<button
						onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
						className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold shadow-lg hover:opacity-95 transition-all duration-200"
						>
							GET IN TOUCH
						</button>
					</div>
				</motion.div>
			</motion.div>
		</section>
	)
}
