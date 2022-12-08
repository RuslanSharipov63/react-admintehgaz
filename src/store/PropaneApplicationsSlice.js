import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        id: 'sdfs324324',
        time: '2022-03-09',
        carNumber: 'а515ев 763 rus',
        amountGasCylinder: '15',
        liters: '400',
        nameDriver: 'Александров',
    },
    {
        id: '345fg',
        time: '2022-04-10',
        carNumber: 'х141нн 163 rus',
        amountGasCylinder: '10',
        liters: '300',
        nameDriver: 'Орлов',
    },

];

export const propaneSlice = createSlice({
    name: '@propane',
    initialState,
    reducers: {
        addPropaneApplication: (state, action) => {
            state.unshift(action.payload)
        },
        deletePropane: (state, action) => {
            return state = state.filter(item => item.id != action.payload)
        },
        editPropaneApplication: (state, action) => {
            return state = state.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            })
        },
        searchPropan: (state, action) => {
            return state = state.filter(item => item.time.includes(action.payload.month, action.payload.count))
        }
    }
})

export const {
    addPropaneApplication,
    deletePropane,
    editPropaneApplication,
    searchPropan
} = propaneSlice.actions;