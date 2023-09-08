export const validateInput = (values,formType = 'login') => {
    const emailRegEx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    
    if(formType === 'login'){
        if(!values.username || !values.password){
            return {error: true,message: "All fields are required",field: !values.username ? 'email' : 'password' }
        }

        if(typeof values.username !== 'string'){
            return {error: true,message: "Not a valid email address or username",field: 'email'}
        }else if(!passwordRegEx.test(values.password)){
            console.log(values.password);
            return {error: true,message: "Password must have atleast 8 characters,1 uppercase,1 lowercase,1 number and a special character.",field: 'password' }
        }

        return true
    }else if(formType === 'register'){
        const {name,username,email,password,confirmPassword} = values

        if(!name){
            return {error: true,message: "All fields are required",field: 'name' }
        }else if(!email){
            return {error: true,message: "All fields are required",field: 'email' }
        }else if(!username){
            return {error: true,message: "All fields are required",field: 'username' }
        }else if(!password){
            return {error: true,message: "All fields are required",field: 'password' }
        }else if(!confirmPassword){
            return {error: true,message: "All fields are required",field: 'confirmPassword' }
        }

        if(name.length < 3){
            return {error: true,message: "Name must have at least 3 characters.",field: 'name' }
        }else if(typeof name !== 'string'){
            return {error: true,message: "Name should be a string.",field: 'name' }
        }else if(username.length < 3 || typeof username !== 'string'){
            return {error: true,message: "Name should be a string.",field: 'username' }
        }else if(!emailRegEx.test(email) || typeof email !== 'string'){
            return {error: true,message: "Email address is not valid.",field: 'email' }
        }else if(!passwordRegEx.test(password)){
            return {error: true,message: "Password must have atleast 8 characters,1 uppercase,1 lowercase,1 number and a special character.",field: 'password' }
        }else if(password !== confirmPassword){
            return {error: true,message: "Passwords did not matched.",field: 'confirmPassword' }
        }

        return true
    }

    return false
}