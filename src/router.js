import {createRouter, createWebHashHistory} from "vue-router";

const Login = () => import("./components/Login")
const HomePage = () => import("./components/HomePage")
const Dashboard = () => import("./components/Dashboard")

const routes = [
    {path: "/", redirect: "/Login"},
    {
        path: "/Login",
        name: "Login",
        component: Login
    },
    {
        path: "/HomePage",
        name: "HomePage",
        component: HomePage
    },
    {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})