import axios from "axios";

const axiosGlobal = axios.create({
    baseURL: "https://grocery-strapi-lhum.onrender.com/api",
})

const getCategory = () => {
    return axiosGlobal.get("/categories?populate=*");
}

const getSlider = () => axiosGlobal.get("/sliders?populate=*").
    then((resp) => {
        return resp.data.data;
    })

const getCategoryList = () => axiosGlobal.get("/categories?populate=*").
    then((resp) => {
        return resp.data.data;
    })

const getProductList = () => axiosGlobal.get("/products?populate=*").
    then((resp) => {
        return resp.data.data;
    })



const getProductByCategory = (category) => axiosGlobal.get("/products?filters[categories][name][$in]=" + category + "&populate=*").
    then((resp) => {
        return resp.data.data;
    })

const registerUser = (username, email, password) => axiosGlobal.post("/auth/local/register",
    {
        username: username,
        email: email,
        password: password
    }).then((resp) => {
        return resp.data;
    })


const signInUser = (email, password) => axiosGlobal.post("/auth/local",
    {
        identifier: email,
        password: password
    }).then((resp) => {
        return resp.data;
    })

const addToCart = (data, jwt) => axiosGlobal.post("/user-carts", data, {
    headers: {
        Authorization: "Bearer " + jwt
    }

})

// Fetch cart items for a user with product details ----- check it later
const getCartItems = (userId, jwt) => axiosGlobal.get("/user-carts?filters[userId][$eq]=" + userId + "&populate=products.image", {
    headers: {
        Authorization: "Bearer " + jwt
    }
}).then((resp) => {
    const data = resp.data?.data || [];

    const cartItemsList = data.map((item) => {
        const product = item?.products?.[0] || {};
        return {
            name: product?.name || '',
            quantity: item.quantity || 1,
            image: product?.image?.[0]?.url || '',
            amount: item.amount || 0,
            id: item.id,
            sellingPrice: product?.sellingPrice || 0,
            productId: product?.id
        }
    });
    return cartItemsList;
})

const createOrder = (data, jwt) => axiosGlobal.post("/orders", data, {
    headers: {
        Authorization: "Bearer " + jwt
    }
})


const myOrders = (userId, jwt) => axiosGlobal.get("/orders?filters[userId][$eq]=" + userId + "&populate[orderItemList][populate][product][populate]=image", {
    headers: {
        Authorization: "Bearer " + jwt
    }
}).then((resp) => {
    const response = resp.data.data;
    const orderList = response.map((item, index) => {
        return {
            id: item.id,
            totalOrderAmount: item.attributes?.totalOrderAmount || item.totalOrderAmount,
            orderItemList: item.attributes?.orderItemList || item.orderItemList,
            createdAt: item.attributes?.createdAt || item.createdAt,
        }
    });

    console.log("orderList================", orderList);

    return orderList;
})




export default {
    getCategory, getSlider, getCategoryList,
    getProductList, getProductByCategory,
    registerUser, signInUser, addToCart, getCartItems, createOrder, myOrders
}