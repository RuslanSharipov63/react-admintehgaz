import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        id: "23sdfgdfs",
        time: "2022-10-02",
        company: "Аполло",
        list: [
            {
                gazId: '909sdfdsf',
                name: 'Аргон ВС',
                count: '3',
            },
            {
                gazId: 'djfghd357349',
                name: 'Кислород',
                count: '2'
            }
        ],
        adress: "г. Самара, ул. Пугачевская 8",
        inn: "1234567890",
        comment: "Забрать подписанные акты на аренду"
    },
    {
        id: "df3e432xg",
        time: "2022-10-03",
        company: "Электрощит",
        list: [
            {
                gazId: 'sdf343',
                name: 'Коргон',
                count: '6',
            },
            {
                gazId: 'dghd1045gf',
                name: 'Аргон ВС',
                count: '5'
            }
        ],
        adress: "г. Отрадный, ул. Мира 10",
        inn: "2314569",
        comment: "Контакт на месте, Александр тел.: 89277132454"
    },

]

export const GazApplicationsSlice = createSlice({
    name: '@gaz',
    initialState,
    reducers: {
        addApllication: (state, action) => {

            state.unshift(action.payload)
        },
        deleteApplication: (state, action) => {
            return state.filter(item => item.id != action.payload)
        },
        searchApplication: (state, action) => {
            return state.filter(item => item.company.toLowerCase().includes(action.payload.toLowerCase()))
        },
        editApllication: (state, action) => {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
            }
        }
    }

)

export const { addApllication, deleteApplication, searchApplication, editApllication } = GazApplicationsSlice.actions;