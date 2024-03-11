import { BN } from '@common'
import { PageSEO } from '@components/PageSEO'
import sideNavigation from '@data/sideNavigation'
import { constructRecoveryFactor } from '@helpers/recoveryFactor'
import { deriveMetadatas, deriveWallet } from '@libs/storage'
import { GetStaticProps } from 'next'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async () => {
	const siteInfo = sideNavigation.find((item) => item.path === '/settings')

	return {
		props: {
			title: siteInfo?.title,
			description: siteInfo?.description,
		},
	}
}

const Settings = ({ title, description }: PageSEOProps) => {
	const [password, setPassword] = useState('')

	const handleSubmit = async () => {
		const { user, networkFactor } = deriveWallet()
		await constructRecoveryFactor({
			user: user.email!,
			networkFactor: {
				x: BN.from(networkFactor!.x, 16),
				y: BN.from(networkFactor!.y, 16),
			},
			password,
		})
	}

	return (
		<>
			<PageSEO title={title} description={description} />
			<div className="container mx-auto px-4">
				<h1 className="my-8 text-3xl font-bold">Settings</h1>
				<div className="flex flex-col">
					<label htmlFor="password" className="text-lg font-semibold">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="rounded-md border border-gray-300 p-2"
					/>
					<button
						onClick={handleSubmit}
						className="mt-4 rounded-md bg-blue-500 p-2 text-white"
					>
						Submit
					</button>
				</div>
			</div>
		</>
	)
}

export default Settings
