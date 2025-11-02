const API = "http://localhost:3000";

// ✅ SIGNUP
async function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;

    const body = { name, email, password, role };

    const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
}

// ✅ LOGIN
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert("Login failed!");
    }
}

// ✅ GET PRODUCTS
async function loadProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        return;
    }

    const res = await fetch(`${API}/products`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const products = await res.json();

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.name} - $${p.price}`;
        list.appendChild(li);
    });
}