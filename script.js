document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Prijavljeni ste');
            } else {
                alert('Neuspešna prijava');
            }
        } catch (error) {
            console.error('Greška prilikom prijave', error);
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                alert('Registracija uspešna');
            } else {
                alert('Neuspešna registracija');
            }
        } catch (error) {
            console.error('Greška prilikom registracije', error);
        }
    });

    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} ${product.currency}</p>
                `;
                productList.appendChild(productItem);
            });
        });

    document.getElementById('livechat-button').addEventListener('click', function () {
        const chatWindow = document.getElementById('livechat-window');
        if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
            chatWindow.style.display = 'block';
        } else {
            chatWindow.style.display = 'none';
        }
    });

    document.getElementById('send-message').addEventListener('click', function () {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const newMessage = document.createElement('div');
        newMessage.textContent = chatInput.value;
        chatMessages.appendChild(newMessage);
        chatInput.value = '';
    });
});
