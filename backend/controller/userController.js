import User from "../model/user"

export const createUser = async ({name, email, password}) => {

    const userExists = await User.findOne({email}).select('_id')

    if (userExists === null) {
        const user = await User.create({name, email, password})
        return user
    } else {
        return false
    }
    
}

