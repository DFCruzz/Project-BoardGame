import { database } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals (req, res) {

    try {
        
        const rentalInfo = await database.query(`SELECT * FROM rentals`)
        const customerInfo = await database.query(`SELECT id, name FROM customer`)
        const gameInfo = await database.query(`SELECT id, name FROM games`)

        const rentalsList = rentalInfo.rows.map(a => ({
            ...a,
            customer: customerInfo.rows.find(b => b.id == a.customerId),
            game: gameInfo.rows.find(c => c.id == a.gameId)

        }))

        return res.send(rentalsList)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function rentGame (req, res) {
    const { customerId, gameId, daysRented } = req.body
    const rentalDate = dayjs().format("YYYY-MM-DD")

    try {
        const checkCustomer = await database.query('SELECT * FROM customers WHERE id = $1', [customerId])
        if (checkCustomer.rowCount === 0) {
            return res.status(400).send("Cliente não cadastrado")
        }

        const checkGame = await database.query(`SELECT * FROM games WHERE id = $1`, [gameId])
        if (checkGame.rowCount === 0) {
            return res.status(400).send("Jogo não encontrado")
        }

        const isGameAvailable = checkGame.rows[0].stockTotal

        const checkStock = await database.query(`SELECT count("gameId") as stock FROM rentals WHERE "gameId" = $1`, [gameId])
        if (isGameAvailable.rowCount === 0) {
            return res.status(400).send("Jogo não disponível para alugar")
        }

        const originalPrice = daysRented * checkGame.rows[0].pricePerDay

        await database.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentalDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, null, ,$5, null)`,
            [customerId, gameId, rentalDate, daysRented, originalPrice]
        )

        res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}