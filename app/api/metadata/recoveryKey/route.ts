import { NextRequest, NextResponse } from 'next/server'

import { deserializeParams } from '@libs/api'
import * as service from '@services/metadata'

export const GET = async (req: NextRequest) => {
    const { user } = deserializeParams(req.nextUrl.searchParams)

    const res = await service.findRecoveryKey(user)

    return NextResponse.json(res)
}

export const PUT = async (req: NextRequest) => {
    const { user, recoveryKey } = await req.json()

    try {
        const res = await service.setRecoveryKey(user, recoveryKey, req.headers.get('Authorization')!)
        return NextResponse.json(res)
    } catch {
        return NextResponse.error()
    }
}
