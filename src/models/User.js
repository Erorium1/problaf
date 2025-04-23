const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_FILE = path.join(__dirname, '../../data/users.json');

class User {
    static async findOne(email) {
        const users = await this.getAllUsers();
        return users.find(user => user.email === email);
    }

    static async findById(id) {
        const users = await this.getAllUsers();
        return users.find(user => user.id === id);
    }

    static async create(userData) {
        const users = await this.getAllUsers();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        users.push(newUser);
        await this.saveUsers(users);
        
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    static async updateLastLogin(userId) {
        const users = await this.getAllUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            await this.saveUsers(users);
        }
    }

    static async getAllUsers() {
        try {
            const data = await fs.promises.readFile(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.saveUsers([]);
                return [];
            }
            throw error;
        }
    }

    static async saveUsers(users) {
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    }

    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User; 