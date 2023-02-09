import { database } from "../database/database.connection.js";

export async function getGamesList (req, res) {
    try {
        const gamesList = await database.query("SELECT * FROM games;")

        res.send(gamesList.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
} 

export async function addNewGame (req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body

    try {

        const isNameAvailable = await database.query(
            `SELECT * FROM games WHERE name = $1`, [name]   
        )

        if(isNameAvailable.rowCount > 0) {
            return res.status(400).send("Jogo já cadastrado!")
        }

        await database.query(
            `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]
        )
        return res.sendStatus(201)
    


    } catch (error) {
        res.status(500).send(error.message)
    }
}