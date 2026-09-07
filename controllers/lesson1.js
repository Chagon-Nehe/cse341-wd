const homeRoute = (req, res) => {
    res.send("Hello Chawa from Express!");
}

const apiRoute = (req, res) => {
    res.json({ id: 1, name: "Chawa" });
}

export { homeRoute, apiRoute };