import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8010'
})

export function getUser(id) {
    return request.get("/users/" + id).then(response => {
        return response.data
    })
}

export function register(telephone, password, nickName, gender) {
    const body = {
        "telephone": telephone,
        "password": password,
        "nickName": nickName,
        "gender": gender
    };

    return request.post("/users/register", body).then(response => {
        return response.data;
    })
}

export function userLogin(telephone, password) {
    const body = {
        "telephone": telephone,
        "password": password
    };

    return request.post("/users/login", body).then(response => {
        return response.data;
    })
}

export function adminLogin(userName, password) {
    const body = {
        "userName": userName,
        "password": password
    };

    return request.post("/admins/login", body).then(response => {
        return response.data;
    })
}

export function getSellerList(pageNum, pageSize) {
    const config = {
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
        }
    }

    return request.get("/sellers", config).then(response => {
        return response.data;
    })
}

export function addSeller(name) {
    const body = {
        "name": name
    };

    return request.post("/sellers", body).then(response => {
        return response.data;
    })
}

export function sellerUp(id) {
    let formData = new FormData();
    formData.append('id', id);

    return request.put("/sellers/up", formData).then(response => {
        return response.data
    })
}

export function sellerDown(id) {
    let formData = new FormData();
    formData.append('id', id);

    return request.put("/sellers/down", formData).then(response => {
        return response.data
    })
}

export function getCategoryList() {
    return request.get("/categories").then(response => {
        return response.data
    })
}

export function addCategory(name, iconUrl, sort) {
    const body = {
        "name": name,
        "iconUrl": iconUrl,
        "sort": sort
    };

    return request.post("/categories", body).then(response => {
        return response.data;
    })
}

export function getShopList(categoryId, pageNum, pageSize) {
    const config = {
        params: {
            categoryId: categoryId,
            pageNum: pageNum,
            pageSize: pageSize
        }
    }
    return request.get("/shops", config).then(response => {
        return response.data
    })
}

export function recommendShop(userId) {
    const config = {
        params: {
            userId: userId
        }
    }
    return request.get("/shops/recommend", config).then(response => {
        return response.data
    })
}

export function searchShop(latitude, longitude, keyword, categoryId, pageNum, pageSize) {
    const config = {
        params: {
            latitude: latitude,
            longitude: longitude,
            keyword: keyword,
            categoryId: categoryId,
            pageNum: pageNum,
            pageSize: pageSize
        }
    }
    return request.get("/shops/search", config).then(response => {
        return response.data
    })
}

export function addShop(name, pricePerMan, latitude, longitude, categoryId, tags, startTime, endTime, address, sellerId, iconUrl) {
    const body = {
        "name": name,
        "pricePerMan": pricePerMan,
        "latitude": latitude,
        "longitude": longitude,
        "categoryId": categoryId,
        "tags": tags,
        "startTime": startTime,
        "endTime": endTime,
        "address": address,
        "sellerId": sellerId,
        "iconUrl": iconUrl,
    };

    return request.post("/shops", body).then(response => {
        return response.data;
    })
}

export function getPosition(address) {
    return request.get("/geo?address=" + address).then(response => {
        return response.data
    })
}