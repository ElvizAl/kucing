import { Agent } from "@anvia/core";
import { model } from "./model";
import { BASE_INSTUCTIONS } from "./prompt";
import { searchPenyakit } from "../tools/search_knowledge";

export const assistantAgent = new Agent({
    id: "assisten Pendektesi kucing",
    name: "Asisten Pendektesi Kucing",
    model: model,
    instructions: BASE_INSTUCTIONS,
    tools: [searchPenyakit],
    maxTurns: 5
})