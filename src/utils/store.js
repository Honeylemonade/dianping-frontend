import {reactive} from "vue";

const store = {
    state: reactive({
        role: 'visitor',
        userId: "3",
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
    },
    setUserId(userId) {
        this.state.userId = userId
    },
    getUserId() {
        return this.state.userId
    }
}

export default store