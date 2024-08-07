'use client'

import { useState } from 'react'

import AccountCard from '@components/AccountCard'
import { getLocalUsers } from '@libs/local'

const AccountCardSlider = () => {
	const [click, setClick] = useState<number | null>(null)

	const localUsers: LocalUser[] = getLocalUsers()

	const handleClick = (index: number) => {
		if (click === null) {
			setClick(index)
		} else {
			setClick(null)
		}
	}

	if (localUsers.length === 0) {
		return null
	}

	return (
		<div className="mx-auto grid gap-5">
			<div
				className="flex w-[90vw] gap-5 text-base transition-all duration-300 ease-in-out aria-expanded:gap-0"
				aria-expanded={click !== null}
			>
				{localUsers
					.sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime())
					.map((localUser, index) => (
						<AccountCard
							key={index}
							localUser={localUser}
							click={() => handleClick(index)}
							hidden={click !== null && click !== index}
							focus={click !== null}
						/>
					))}
			</div>
		</div>
	)
}

export default AccountCardSlider
