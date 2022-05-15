import {reactive} from "vue";

const store = {
    state: reactive({
        role: 'visitor',
        latitude: 31.23916171,
        longitude: 121.48789949
    }),
    setUserRole() {
        this.state.role = "user"
    },
    setAdminRole() {
        this.state.role = "admin"
    },
    isAdmin() {
        return this.state.role === "admin"
    }
}

export default store