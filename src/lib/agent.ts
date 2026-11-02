import { Agent } from "@anvia/core";
import { chatModel } from "./model";
import { BASE_INSTRUCTIONS } from "./prompt";
import { searchPenyakit } from "../tools/search_knowledge";

export const assistantAgent = new Agent({
  id: "assisten Pendektesi kucing",
  name: "Asisten Kesehatan Kucing",
  model: chatModel,
  instructions: BASE_INSTRUCTIONS,
  tools: [searchPenyakit],
  maxTurns: 5,
});
