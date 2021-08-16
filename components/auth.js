export const isAuth = () =>{
    firebase.auth().onAuthStateChanged(user =>{
        if(user === null){
            route.replace('/login')
        }
    })
}