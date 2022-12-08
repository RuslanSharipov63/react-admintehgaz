import { configureStore } from "@reduxjs/toolkit";
import { GazApplicationsSlice } from "./GazApplicationsSlice";
import { propaneSlice } from "./PropaneApplicationsSlice";
import { DebtApplicationsSlice } from "./DebtApplicationsSlice";
import { IsModalWindowSlice } from "./IsModalWindowSlice";

export const store = configureStore({
    reducer: {
        gazList: GazApplicationsSlice.reducer,
        propaneList: propaneSlice.reducer,
        debtList: DebtApplicationsSlice.reducer,
        IsMW: IsModalWindowSlice.reducer
    }
})

