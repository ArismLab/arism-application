import { createSlice } from '@reduxjs/toolkit'

import * as actions from '@store/signUp/actions'

const initialState: { data: SignUpSteps; loading: boolean; error: any } = {
    data: [
        {
            instruction: {
                name: 'Creating Private Key',
                description: "Randomly generating a Private Key or using user's existed Private Key on the Application",
            },
            state: '',
            privateKeyInput: true,
        },
        {
            instruction: {
                name: 'Creating Device Key',
                description: 'Randomly generating a Device Factor on the Application',
            },
            state: '',
        },
        {
            instruction: {
                name: 'Verifying & Storing Metadata',
                description:
                    'Verifying and Storing information of User and Device from Application to the Metadata Server if valid',
            },
            state: '',
        },
    ],
    loading: false,
    error: undefined,
}

export const signUp = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Private Factor step 1 methods
        builder.addCase(actions.emitStep1.pending, (state) => {
            state.loading = true
        })
        builder.addCase(actions.emitStep1.fulfilled, (state, action) => {
            state.data[0].state = action.payload
            state.loading = false
            state.error = undefined
        })
        builder.addCase(actions.emitStep1.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

        // Device Factor step 1 methods
        builder.addCase(actions.emitStep2.pending, (state) => {
            state.loading = true
        })
        builder.addCase(actions.emitStep2.fulfilled, (state, action) => {
            state.data[1].state = action.payload
            state.loading = false
            state.error = undefined
        })
        builder.addCase(actions.emitStep2.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

        // Verify storage step methods
        builder.addCase(actions.emitStep3.pending, (state) => {
            state.loading = true
        })
        builder.addCase(actions.emitStep3.fulfilled, (state, action) => {
            state.data[2].state = action.payload
            state.loading = false
            state.error = undefined
        })
        builder.addCase(actions.emitStep3.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    },
})

export default signUp.reducer
