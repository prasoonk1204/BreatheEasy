import React from 'react'; 
import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Features',
			href: '#features',
		},
		{
			label: 'About',
			href: '#about',
		},
		{
			label: 'Contributors',
			href: '#contributors',
		},
	];

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			setOpen(false); // Close mobile menu after clicking
		}
	};

	return (
		<header className="absolute top-4 left-0 right-0 z-50 px-4">
			<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 bg-white/80 dark:bg-gray-900/80 supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50">
				<div className="flex items-center gap-3">
					<motion.img
						src="/favicon.png"
						alt="Logo"
						className="w-8 h-8"
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
						whileHover={{ scale: 1.1, rotate: 20 }}
					/>
					<motion.h1
						className="text-2xl font-bold text-emerald-600 dark:text-green-400 notranslate"
						whileHover={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 300 }}
					>
						BreatheEasy
					</motion.h1>
				</div>
				<div className="hidden items-center gap-2 lg:flex">
					{links.map((link) => (
						<a
							key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
							onClick={(e) => handleClick(e, link.href)}
						>
							{link.label}
						</a>
					))}
				</div>
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="outline" className="lg:hidden">
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6"
						/>
					</Button>
					<SheetContent
						className="bg-white/95 dark:bg-gray-800/95 supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-800/80 gap-0 backdrop-blur-lg"
						showClose={false}
						side="left"
					>
						<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
							{links.map((link) => (
								<a
									key={link.label}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start',
									})}
									href={link.href}
									onClick={(e) => handleClick(e, link.href)}
								>
									{link.label}
								</a>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
