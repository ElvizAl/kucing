import "dotenv/config";
import { Studio } from "@anvia/studio";
import { assistantAgent } from "./lib/agent";

const studio = new Studio([
    assistantAgent
])

studio.start({
    hostname: "127.0.0.1",
    port: 4021
})