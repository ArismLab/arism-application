'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle, IoIosWarning } from 'react-icons/io'

import LogoutButton from '@components/Home/LogoutButton'
import Dashboard from '@components/Icon/Dashboard'
import Devices from '@components/Icon/Devices'
import DIDs from '@components/Icon/DIDs'
import Settings from '@components/Icon/Settings'
import Transactions from '@components/Icon/Transactions'
import Wallets from '@components/Icon/Wallets'
import siteMetadata from '@data/siteMetadata.json'
import { checkMfa } from '@helpers/recoveryFactor'
import cn from '@libs/class'

const Icons = { Dashboard, Wallets, Transactions, DIDs, Devices, Settings }

const LayoutWrapper = ({ children }) => {
	const pathname = usePathname()
	const router = useRouter()

	const isHome = pathname === '/' || pathname === '/login'
	const [userSession, setUserSession] = useState<SessionUser | null>()
	const [enabledMfa, setEnabledMfa] = useState(false)

	useEffect(() => {
		;(async () => {
			const session: any = await getSession()
			if (!session && !isHome) {
				router.push('/')
			}
			const mfa = session ? await checkMfa(session.info.email) : false
			setUserSession(session as SessionUser)
			setEnabledMfa(mfa)
		})()
	}, [])

	const pageTitle = siteMetadata.internalLinks.find((item) => item.path === pathname)?.title

	if (isHome) {
		return <>{children}</>
	}

	return (
		<div className="bg-global flex h-screen w-screen">
			<div className="flex w-1/5 flex-col text-zinc-800">
				<Link className="mx-auto flex place-items-center items-center py-10" href="/">
					<Image alt="Arism logo" src="/static/logo.png" width={65} height={65} />
					<div className="flex flex-col">
						<h1 className="text-4xl font-extralight">Arism Wallet</h1>
						<p className="text-center text-xs font-light tracking-widest">THE NEXT-GEN WALLET</p>
					</div>
				</Link>
				<div className="flex flex-col items-center justify-center space-y-2 transition duration-150 ease-in-out">
					{siteMetadata.internalLinks.map((item, index) => (
						<Link
							href={item.path}
							key={index}
							className={cn(
								'mx-auto flex h-14 w-5/6 items-center justify-items-start py-3 transition-all duration-200 ease-in-out hover:rounded-xl hover:bg-black hover:bg-opacity-10',
								pathname === item.path ? 'pointer-events-none rounded-xl bg-zinc-900 text-white' : 'text-zinc-500'
							)}
						>
							{Icons[item.title]({ fill: pathname === item.path, className: 'h-6 w-1/3' })}
							<span className="w-2/3 text-base">{item.title}</span>
						</Link>
					))}
				</div>
				<div className="mb-10 ml-[20%] mt-auto flex flex-col space-y-5">
					{siteMetadata.externalLinks.map((item) => (
						<Link
							href={item.url}
							key={item.name}
							className="flex items-start text-base text-zinc-500 transition-all duration-200 ease-in-out hover:text-black"
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
			<hr className="h-full w-[0.75px] self-center bg-black bg-opacity-10" />
			<main className="size-full">
				<div className="flex size-full flex-col p-12">
					<div className="flex w-full justify-between">
						<p className="text-5xl font-extrabold">{pageTitle}</p>
						<div className="flex place-items-center gap-5">
							<div className="flex items-center space-x-2 ">
								{enabledMfa ? (
									<button className="group flex h-12 place-items-center rounded-full bg-white py-2 pl-3 pr-2 text-sm text-success transition-all duration-200 ease-in-out hover:bg-success hover:text-white">
										<IoIosCheckmarkCircle className="size-5" />
										<p className="px-2 font-semibold group-hover:text-white">MFA is enabled</p>
									</button>
								) : (
									<button className="group flex h-12 place-items-center rounded-full bg-white py-2 pl-3 pr-2 text-sm text-error transition-all duration-200 ease-in-out hover:bg-error hover:text-white">
										<IoIosWarning className="size-5 " />
										<p className="px-2 font-semibold group-hover:text-white">MFA is not enabled</p>
									</button>
								)}
							</div>
							<hr className="h-full w-[0.75px] bg-black bg-opacity-10" />
							<div className="flex items-center space-x-2 ">
								<button className="flex place-items-center rounded-full bg-white py-2 pl-3 pr-2 text-sm transition-all duration-200 ease-in-out hover:bg-primary-600 hover:text-white">
									<Image
										alt="User avatar"
										src={userSession?.info.image ?? ''}
										width={30}
										height={30}
										className="rounded-full"
									/>
									<p className="px-2">{userSession?.info.name ?? ''}</p>
								</button>
								<LogoutButton />
							</div>
						</div>
					</div>
					<div className="size-full py-3">{children}</div>
				</div>
			</main>
		</div>
	)
}

export default LayoutWrapper
