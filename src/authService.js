import axios from 'axios';

const authService = {};


authService.login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/login', credentials);
        // alert(response)
        const token = response.data.token;
        const user = response.data.user
        localStorage.setItem('token', token);
        localStorage.setItem('userId',user._id);
        localStorage.setItem('userType',user.type);
        // console.log(user)
        return [true, user];
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
};

authService.register = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/user/create', data)
        return true
    } catch (err) {
        console.error('Registration failed', err);
        return false;
    }
}

// authService.logout = () => {
//     localStorage.removeItem('token');
// };

// authService.getCurrentUser = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         return jwtDecode(token);
//     }
//     return null;
// };




export default authService;
