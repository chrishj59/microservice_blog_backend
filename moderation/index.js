const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
	const { type, data } = req.body;
	if (type === "CommentCreated") {
		const status = data.content.includes("orange") ? "rejected" : "approved";
		await axios.post("http://event-bus-srv:4005/events", {
			type: "CommentModerated",
			data: { id: data.id, postId: data.postId, status, content: data.content },
		});
		console.log(`Moderated status is now  ${status}`);
	}

	res.status(200).send("Moderation called");
});

app.listen(4003, () => {
	console.log("Moderation listening on port 4003");
});
