import { database } from "../database/database.connection.js";

export async function getCustomersList (req, res) {
    try {
        const customersList = await database.query("SELECT * FROM customers;")

        res.send(customersList.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params

    try {
        
        const customerId = await database.query(
            `SELECT * FROM customers WHERE id = $1;`, [id]
        )

        if(customerId.rowCount === 0) {
            return res.sendStatus(404)
        }

        res.send(customerId.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function addNewCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        
        const isUserRegistered = await database.query(
            `SELECT * FROM customers WHERE cpf = $1;`, [cpf]
        )

        if (isUserRegistered.rowCount > 0) {
            return res.status(409).send("Usuário já cadastrado!")
        }

        await database.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]
        )

        res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function updateCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {
        
        const customerId = await database.query(
            `SELECT * FROM customers WHERE id = $1;`, [id]
        )

        if(customerId.rowCount === 0) {
            return res.sendStatus(404)
        }

        const isCpfAvailable = await database.query(
            `SELECT * FROM customers WHERE cpf = $1 AND id <> $2;`, [cpf, id]
        )
        
        if (isCpfAvailable.rowCount > 0) {
            return res.sendStatus(409)
        }

        await database.query(
            `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;` [name, phone, cpf, birthday, id]
        )

        res.sendStatus(200)

    } catch (error) {
        res.status(500).send(error.message)
    }
}