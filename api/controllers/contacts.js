import mongodb from "mongodb";
import { ObjectId } from "mongodb";
import { initDB, getDB } from "../../connection.js";

await initDB();

const homeRoute = (req, res) => {
    res.send("Welcome to the Home Page!");
}

const getContacts = async (req, res) => {
    try {
        const db = getDB();
        const contacts = await db.collection("contacts").find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ error: "Failed to fetch contact" });
    }
};

export { homeRoute, getContacts, getContactById };