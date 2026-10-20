import { createContext } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()

        return age
    }

    const months = ["", "Jan", "Feb", "Mar", " Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArr = slotDate.split('-')
        return dateArr[0] + " " + months[Number(dateArr[1])] + " " + dateArr[2]
    }

    const currency = "$"

    const value = {
        calculateAge,
        slotDateFormat,
        currency

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;