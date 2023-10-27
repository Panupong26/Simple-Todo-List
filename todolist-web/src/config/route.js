import RegisterPage from '../page/RegisterPage';
import LoginPage from '../page/LoginPage';
import ProfilePage from '../page/ProfilePage';
import ListPage from '../page/ListPage';



const component = {
    register : {
        url : '/register',
        component : RegisterPage
    },
    login : {
        url : '/login',
        component : LoginPage
    },
    profile : {
        url : '/profile',
        component : ProfilePage
    },
    todolist : {
        url : '/list',
        component : ListPage
    }
}

const route =  {
    guest : {
       allowAccess : [component.login, component.register], 
       redirectRoute : '/login'
   },
    user : {
       allowAccess : [component.profile, component.todolist], 
       redirectRoute : '/profile'
    }
};

export default route