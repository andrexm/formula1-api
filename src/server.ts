import fastify from "fastify"
import cors from "@fastify/cors"
import Drivers from "./controllers/drivers"
import Teams from "./controllers/teams"

const server = fastify({ logger: true })

server.register(cors, {
  origin: "*"
})

// Drivers routes
server.get("/drivers", Drivers.getAllDrivers)
server.get("/drivers/:id", Drivers.getDriverById)
server.post("/drivers", Drivers.createDriver)
server.put("/drivers/:id", Drivers.updateDriver)
server.delete("/drivers/:id", Drivers.deleteDriver)

// Teams routes
server.get("/teams", Teams.getAllTeams)
server.get("/teams/:id", Teams.getTeamById)
server.post("/teams", Teams.createTeam)
server.put("/teams/:id", Teams.updateTeam)
server.delete("/teams/:id", Teams.deleteTeam)

server.listen({ port: parseInt(process.env.PORT + "") || 3000 }, () => {
  console.log("Server is running...")
})

