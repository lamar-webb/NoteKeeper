import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Creating a new instance of the Express application
const app = express();

// Creating a new instance of PrismaClient to interact with the database
const prisma = new PrismaClient();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enabling CORS to allow cross-origin requests
app.use(cors())

// GET request handler to fetch all notes from the database
app.get("/api/notes", async (req, res) =>{
     // Fetching all notes using Prisma
    const notes = await prisma.note.findMany();
    
    // Sending the fetched notes as a JSON response (to the frontend)
    res.json(notes);
});

// POST request handler to create a new note
app.post("/api/notes", async(req, res)=>{
    const { title, content } = req.body;
     
    // Validating the presence of required fields
    if(!title || !content){
        return res.status(400).send("title and content both required");
    }

    try {
        // Creating a new note using Prisma and sending it as a response
        const note = await prisma.note.create({
            data: {title, content}
        })
        res.json(note);
        
    } catch (error) {
        // Handling errors and sending a generic error message
        res.status(500).send("oops something went wrong")
    }
})

// PUT request handler to update an existing note by ID
app.put("/api/notes/:id", async (req, res) => {
    const {title, content} = req.body;
    const id = parseInt(req.params.id);

        // Validating the presence and validity of required fields and ID
    if(!title || !content){
        return res.status(400).send("title and content field required");
    }

    if(!id || isNaN(id)){
        return res
        .status(400)
        .send("ID must be valid number");
    }

    try {
        // Updating the note and sending the updated note as a response
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content }
        })
        res.json(updatedNote)
    } catch (error){
        // Handling errors and sending a generic error message
        res.status(500).send("oops something went wrong")
    }

})

// DELETE request handler to delete a note by ID
app.delete("/api/notes/:id", async (req, res)=>{
    const id = parseInt(req.params.id);

    // Validating the presence and validity of ID
    if(!id || isNaN(id)){
        return res.status(400).send("ID must be valid integer");
    }
    try {
        // Deleting the note and sending a 204 No Content response
        await prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        // Handling errors and sending a generic error message
        res.status(500).send("oops, something went wrong");
    }
})

// Starting the Express server on port 5000
app.listen(5000, ()=>{
    console.log("server is running on local host: 5000");
});