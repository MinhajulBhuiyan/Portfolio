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
	hoverColor?: string
}

const services: Service[] = [
	{
		icon: Monitor,
		title: 'Web Development',
		description:
			'Building responsive and scalable web applications with modern technologies and best practices for optimal performance.',
		color: '#3b82f6',
		hoverColor: '#1b71fbff',
	},
	{
		icon: Smartphone,
		title: 'Mobile Development',
		description:
			'Creating native and cross-platform mobile applications that deliver seamless user experiences across devices.',
		color: '#06b6d4',
		hoverColor: '#0bd3f6ff',
	},
	{
		icon: Palette,
		title: 'UI/UX Design',
		description:
			'Designing intuitive and engaging user interfaces with a focus on usability and aesthetic excellence.',
		color: '#ec4899',
		hoverColor: '#f156a3ff',
	},
	{
		icon: Server,
		title: 'Backend Development',
		description:
			'Developing robust server-side solutions with secure APIs and efficient database management systems.',
		color: '#f59e0b',
		hoverColor: '#edaa36ff',
	},
	{
		icon: Cloud,
		title: 'Cloud Solutions',
		description: 'Implementing scalable cloud infrastructure and services for enhanced performance and reliability.',
		color: '#8b5cf6',
		hoverColor: '#8350f8ff',
	},
	{
		icon: Brain,
		title: 'AI Integration',
		description: 'Integrating artificial intelligence and machine learning capabilities to automate and enhance business processes.',
		color: '#06b6d4',
		hoverColor: '#2fc7e1ff',
	},
	{
		icon: Settings,
		title: 'DevOps Engineering',
		description: 'Streamlining development workflows with continuous integration, deployment, and infrastructure automation.',
		color: '#fb923c',
		hoverColor: '#f98b30ff',
	},
	{
		icon: Database,
		title: 'Database Solutions',
		description: 'Designing and optimizing database architectures for high-performance data management and analytics.',
		color: '#10b981',
		hoverColor: '#1fc28cff',
	},
	{
		icon: Briefcase,
		title: 'Technical Consulting',
		description: 'Providing expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.',
		color: '#f472b6',
		hoverColor: '#f161acff',
	},

]
export default function Services() {
	const carouselRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)
	const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null)

	// resume timeout ref used to auto-resume autoplay after user interaction
	const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	// how long to wait (ms) after user interaction before resuming autoplay
	// reduced to 800ms so resumption feels quicker
	const AUTOPLAY_RESUME_DELAY = 800

	const pauseAutoplayTemporarily = (delay = AUTOPLAY_RESUME_DELAY) => {
		setIsAutoPlaying(false)
		if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
		resumeTimeoutRef.current = setTimeout(() => {
			setIsAutoPlaying(true)
			resumeTimeoutRef.current = null
		}, delay)
	}

	// template layout constants
	const GAP = 30 // px gap between carousel items (template uses 30)

	const SIDE_REDUCTION = 100 // px to reduce each item's side-wise length (increased to make cards narrower)
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200)

	const getItemsPerView = () => {
		if (typeof window === 'undefined') return 3
		if (window.innerWidth < 640) return 1
		if (window.innerWidth < 1024) return 2
		return 3
	}

	const [itemsPerView, setItemsPerView] = useState(getItemsPerView)

	useEffect(() => {
		const handleResize = () => {
			setItemsPerView(getItemsPerView())
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const getNavOffset = (w: number, side: 'left' | 'right') => {
		// return sensible offsets for all sizes; small screens use inside offsets
		if (w <= 480) return side === 'left' ? '8px' : '8px'
		if (w <= 1005) return side === 'left' ? '-40px' : '-40px'
		if (w <= 1085) return side === 'left' ? '-60px' : '-60px'
		if (w <= 1200) return side === 'left' ? '-100px' : '-105px'
		if (w <= 1300) return side === 'left' ? '-80px' : '-85px'
		// desktop: place further out so buttons don't overlap cards
		return side === 'left' ? '-120px' : '-125px'
	}

	const maxIndex = Math.max(0, services.length - itemsPerView)

	// Use InView for section-level entrance animations (match other sections)
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	}

	// Helper to scroll to a given item index and update state (does NOT clobber
	// does NOT clobber other UI state. Selection is intentionally not
	// persisted — cards are visually identical and only show hover styles.
	const scrollToPosition = (index: number) => {
		if (!carouselRef.current) return
		const newIndex = Math.max(0, Math.min(index, maxIndex))
		const itemWidth = carouselRef.current.scrollWidth / services.length
		carouselRef.current.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' })
		setCurrentIndex(newIndex)
	}

	// autoplay interval in ms (reduced to make automatic changing a bit faster)
	const AUTOPLAY_INTERVAL = 2000

	useEffect(() => {
		if (!isAutoPlaying) return

		const interval = setInterval(() => {
			// advance one by one
			scrollToPosition(currentIndex >= maxIndex ? 0 : currentIndex + 1)
		}, AUTOPLAY_INTERVAL)

		return () => clearInterval(interval)
	}, [isAutoPlaying, maxIndex, currentIndex])

	// clear resume timer on unmount
	useEffect(() => {
		return () => {
			if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
		}
	}, [])

	// keep legacy name for handlers
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

	// clamp currentIndex when itemsPerView changes
	useEffect(() => {
		if (currentIndex > maxIndex) scrollToPosition(maxIndex)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemsPerView])



	return (
		<section id="services" className="py-12">
			<motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="container mx-auto px-4">
				{/* Section Header - styled to match other sections */}
				<motion.div variants={itemVariants} className="mb-12 text-center">


					<h2 className="text-4xl md:text-5xl font-poppins font-bold mb-3">
						Professional <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">service</span>
					</h2>

					<p className="text-text-secondary max-w-2xl mx-auto">Professional development services focused on delivering quality solutions</p>
				</motion.div>





				{/* Carousel Container */}
				<motion.div variants={itemVariants} className="relative mt-2">
					<div
						ref={carouselRef}
						className="overflow-hidden"
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<div className="flex transition-transform duration-500 ease-in-out" style={{ gap: `${GAP}px` }}>
							{services.map((s, idx) => {
								const Icon = s.icon
								return (
									<div
										key={s.title}
										className="flex-shrink-0 mt-6 md:mt-8 overflow-visible"
										style={{ width: `calc(${100 / itemsPerView}% - ${((GAP * (itemsPerView - 1) + SIDE_REDUCTION) / itemsPerView).toFixed(2)}px)` }}
									>
										<motion.article
											className={`relative group p-10 transform-gpu transition-all duration-200 ease-in-out h-full cursor-pointer bg-white/6 border-4 border-accent/20 ring-1 ring-accent/8 shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] hover:bg-accent/6 hover:border-accent hover:ring-2 hover:ring-accent/30`}
											style={{ borderRadius: '20px', borderWidth: 4 }}
											role="button"
											tabIndex={0}
											onMouseEnter={() => setHoveredIconIndex(idx)}
											onMouseLeave={() => setHoveredIconIndex(null)}
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
													className="w-[60px] h-[60px] bg-white/14 mx-auto rounded-xl flex items-center justify-center transition-colors duration-200"
													style={{ border: '2px solid', borderColor: hoveredIconIndex === idx ? (s.hoverColor ?? s.color) : (s.color ?? '#ffffff') }}
												>
													<Icon className="w-7 h-7" style={{ color: hoveredIconIndex === idx ? (s.hoverColor ?? s.color) : (s.color ?? '#ffffff') }} />
												</div>
												<h3 id={`service-${idx}`} className="text-[20px] md:text-[22px] font-semibold mt-4 text-white">
													{s.title}
												</h3>
												<p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-white/80">{s.description}</p>
											</div>
										</motion.article>
									</div>
								)
							})}
						</div>
					</div>

					{/* Navigation Arrows */}
					{services.length > itemsPerView && (
						<>
							<button
								onClick={handlePrev}
								disabled={currentIndex === 0}
								className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
								style={{ left: getNavOffset(windowWidth, 'left') }}
								aria-label="Previous services"
							>
								<ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
							</button>

							<button
								onClick={handleNext}
								disabled={currentIndex >= maxIndex}
								className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed z-10"
								style={{ right: getNavOffset(windowWidth, 'right') }}
								aria-label="Next services"
								>
								<ChevronRight className="w-7 h-7" strokeWidth={2.5} />
							</button>
						</>
					)}

					{/* Minimal styled dots below carousel */}
					<div className="mt-6 flex items-center justify-center gap-2">
						{Array.from({ length: maxIndex + 1 }).map((_, i) => {
							// i is the carousel start index (page). Active when it equals `currentIndex`.
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
									{/* outer ring */}
									<span className={`absolute inset-0 rounded-full ${isActive ? 'bg-accent/20' : 'bg-white/10'}`} />
									{/* inner dot */}
									<span className={`${isActive ? 'w-2 h-2 md:w-2 md:h-2 bg-accent rounded-full shadow-sm' : 'w-1.5 h-1.5 bg-white/60 rounded-full'}`} />
								</button>
							)
						})}
					</div>
				</motion.div>

				{/* CTA Banner: Let's Work Together (bottom of Services, no background) */}
				<motion.div variants={itemVariants} className="mt-12 rounded-2xl overflow-hidden p-8 text-center">
					<div className="max-w-4xl mx-auto">
						<h3 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">Let&apos;s Work Together</h3>
						<p className="text-text-secondary max-w-2xl mx-auto mb-6">Ready to bring your ideas to life? Let&apos;s create something amazing together</p>
						<button
							onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
							className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold shadow-lg hover:opacity-95 transition-all duration-200"
						>
							GET IN TOUCH
						</button>
					</div>
				</motion.div>
			</motion.div>
		</section>
	)

}
