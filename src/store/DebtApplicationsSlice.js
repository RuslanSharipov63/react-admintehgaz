import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
    id: 'lkhlkjh6876',
    time: '2022-03-06',
    company: 'Нефтетехнологии',
    text: 'Оставили у себя 1 баллон пропана',
    isDebt: false,

},
{
    id: 'sdfsd234234',
    time: '2022-01-10',
    company: 'Спецпроизводство',
    text: 'Должны ТехГазу 3 баллона аргона, Техгаз должен им 1 баллон кислоты',
    isDebt: false,
},
]

export const DebtApplicationsSlice = createSlice({
    name: '@debt',
    initialState,
    reducers: {
        addDebtApplications: (state, action) => {
            state.unshift(action.payload)
        },
        handleIsDebtActions: (state, action) => {
            return state = state.map(item => {
                if (item.id == action.payload) {
                    return {
                        ...item,
                        isDebt: !item.isDebt
                    }
                } else {
                    return item
                }

            })
        },
        searchAction: (state, action) => {
            return state.filter(item => item.company.toLowerCase().includes(action.payload.toLowerCase()))
        },
        deleteDebtAction: (state, action) => {
            return state.filter(item => item.id != action.payload)
        },
        editDebtAction: (state, action) => {
            return state = state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item;
                }
            })
        }
    }

})

export const {
    addDebtApplications,
    handleIsDebtActions,
    searchAction,
    deleteDebtAction,
    editDebtAction
} = DebtApplicationsSlice.actions