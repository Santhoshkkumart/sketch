import React from 'react'; 
import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import { Link } from 'react-router-dom';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);
	const [visible, setVisible] = React.useState(true);
	const lastScrollY = React.useRef(0);

	const links = [
		{ path: "/", label: "Home" },
		{ path: "/about", label: "About" },
		{ path: "/departments", label: "Departments" },
		{ path: "/projects", label: "Projects" },
		{ path: "/join", label: "Join" },
	];

	React.useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollingUp = currentScrollY < lastScrollY.current;

			setVisible(currentScrollY < 40 || scrollingUp);
			lastScrollY.current = currentScrollY;
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			initial={{ opacity: 1, y: 0 }}
			animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -24 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className="fixed top-0 left-0 right-0 bg-black/60 z-[5000] w-full border-b border-white/10 backdrop-blur-lg font-mono"
			style={{ pointerEvents: visible ? "auto" : "none" }}
		>
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
				<div className="flex items-center gap-2">
					<Link to="/" className="text-xl lowercase tracking-tighter text-[#e8e6e1] font-bold hover:opacity-80 transition-opacity">
						sketch
					</Link>
				</div>
				
				{/* Desktop Links */}
				<div className="hidden items-center gap-8 lg:flex">
					{links.map((link) => (
						<Link
							key={link.path}
							className="text-[13px] uppercase tracking-[0.2em] font-medium text-[#e8e6e1]/70 hover:text-white transition-colors"
							to={link.path}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Mobile Toggle (Within SimpleHeader) */}
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="outline" className="lg:hidden border-white/10 text-white hover:bg-white/5">
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6"
						/>
					</Button>
					<SheetContent
						className="bg-black/95 gap-0 backdrop-blur-lg border-white/10 text-white"
						showClose={false}
						side="left"
					>
						<div className="grid gap-y-6 overflow-y-auto px-8 pt-24 pb-5">
							{links.map((link) => (
								<Link
									key={link.path}
									className="text-3xl uppercase tracking-tighter font-bold text-[#e8e6e1] hover:text-white transition-colors"
									to={link.path}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</motion.header>
	);
}
