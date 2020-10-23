class AuthenticationService {
    constructor(endpoint) {
        this.authenticationEndpoint = endpoint;
    }

    async changePassword(previousPassword, proposedPassword) {
        const url = `${this.authenticationEndpoint}/password`;
        const token = localStorage.getItem('userToken');
        const bearer = `Bearer ${token}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    previousPassword,
                    proposedPassword
                })
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return null;
        }
    }

    async getMe() {
        const url = `${this.authenticationEndpoint}/user/me`;
        const token = localStorage.getItem('userToken');
        const bearer = `Bearer ${token}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return null;
        }
    }


    async login(email, password) {
        const url = `${this.authenticationEndpoint}/login`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            localStorage.setItem('userToken', data.token);
            return data;
        } catch (err) {
            return null;
        }
    }

    async logout() {
        const url = `${this.authenticationEndpoint}/logout`;
        const token = localStorage.getItem('userToken');
        const bearer = `Bearer ${token}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            localStorage.removeItem('userToken');
            return data;
        } catch (err) {
            return null;
        }
    }

    async register(email, firstName, lastName, password) {
        const url = `${this.authenticationEndpoint}/user/register`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return null;
        }
    }

    async requestResetPassword(email) {
        const url = `${this.authenticationEndpoint}/reset`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return null;
        }
    }

    async confirmResetPassword(confirmationCode, email, newPassword) {
        const url = `${this.authenticationEndpoint}/reset_confirm`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    confirmationCode,
                    email,
                    newPassword
                })
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return null;
        }
    }
}

export default AuthenticationService;
