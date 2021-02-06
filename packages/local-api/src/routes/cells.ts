import express from 'express';
import fs from 'fs/promises';

export const createCellsRouter = (filename:string, dir: string) => {
    const router = express.Router();

    router.get('/cells', async (req, res) => {
        // make sure the cell storage file exists
        // if it does not exist, add in a default list of cells

        // read the file
        // parse a list of cells out of it
        // send list of cells back to browser
    });

    router.post('/cells', async (req, res) => {
        // take the list of cells from the request object
        // serialize them - turn them into a format that can be safely written into a file
        const { cells } = req.body;

        // write the cells into the file
    })

    return router;
}